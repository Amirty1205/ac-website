'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PRODUCT_CAPACITY_BY_CATEGORY } from '@/lib/products';

type NeedType = 'heating' | 'cooling' | 'water';
type HeatingClimate = 'mild' | 'normal' | 'cold' | 'very-cold';
type CoolingClimate = 'moderate-humid' | 'hot-dry' | 'hot-humid';
type WaterUsage = 'small' | 'medium' | 'large' | 'heavy';

type Step = 1 | 2 | 3 | 4;

const HEATING_COEFFICIENTS: Record<HeatingClimate, number> = {
  mild: 40,
  normal: 60,
  cold: 80,
  'very-cold': 100,
};

const COOLING_COEFFICIENTS: Record<CoolingClimate, number> = {
  'moderate-humid': 450,
  'hot-dry': 550,
  'hot-humid': 700,
};

const HEATING_CAPACITY_OPTIONS = PRODUCT_CAPACITY_BY_CATEGORY.پکیج;
const COOLING_CAPACITY_OPTIONS = PRODUCT_CAPACITY_BY_CATEGORY['کولر گازی'];
const WATER_CAPACITY_OPTIONS = PRODUCT_CAPACITY_BY_CATEGORY['تصفیه آب'];

function getNearestCapacity(options: number[], needed: number) {
  return options.reduce((best, option) =>
    Math.abs(option - needed) < Math.abs(best - needed) ? option : best,
  options[0]);
}

function buildHeatingCapacity(area: number, climate: HeatingClimate) {
  const baseDemand = area * HEATING_COEFFICIENTS[climate];
  const practical = Math.max(baseDemand, 18000);
  const rounded = Math.round(practical / 1000) * 1000;
  return getNearestCapacity(HEATING_CAPACITY_OPTIONS, rounded);
}

function buildCoolingCapacity(area: number, climate: CoolingClimate) {
  const requiredBtu = area * COOLING_COEFFICIENTS[climate];
  return getNearestCapacity(COOLING_CAPACITY_OPTIONS, requiredBtu);
}

function buildWaterCapacity(personCount: number) {
  if (personCount <= 2) return 60;
  if (personCount <= 4) return 120;
  if (personCount <= 6) return 180;
  return 240;
}

export default function SmartSelectionModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [need, setNeed] = useState<NeedType | null>(null);
  const [heatingClimate, setHeatingClimate] = useState<HeatingClimate>('normal');
  const [coolingClimate, setCoolingClimate] = useState<CoolingClimate>('hot-dry');
  const [waterUsage, setWaterUsage] = useState<WaterUsage>('medium');
  const [area, setArea] = useState<number>(120);
  const [peopleCount, setPeopleCount] = useState<number>(4);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      setNeed(null);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const stepTitle = useMemo(() => {
    if (currentStep === 1) return 'چه چیزی نیاز دارید؟';
    if (currentStep === 2) {
      if (need === 'heating') return 'نوع آب و هوای خانه را مشخص کنید';
      if (need === 'cooling') return 'شرایط اقلیمی منطقه شما چگونه است؟';
      return 'مصرف و نیاز آب شما چقدر است؟';
    }
    if (currentStep === 3) {
      if (need === 'water') return 'تعداد اعضای خانواده را مشخص کنید';
      return 'متراژ تقریبی ساختمان را وارد کنید';
    }
    return 'نتیجه انتخاب شما';
  }, [currentStep, need]);

  const nextStep = () => {
    setCurrentStep((previous) => {
      const maxStep: Step = 4;
      return Math.min(maxStep, previous + 1) as Step;
    });
  };

  const previousStep = () => {
    setCurrentStep((previous) => Math.max(1, previous - 1) as Step);
  };

  const resetModal = () => {
    setCurrentStep(1);
    setNeed(null);
    onClose();
  };

  const onSubmit = () => {
    if (!need) return;

    const params = new URLSearchParams();

    if (need === 'heating') {
      const selectedCapacity = buildHeatingCapacity(area, heatingClimate);
      params.set('category', 'پکیج');
      params.set('capacity', String(selectedCapacity));
    }

    if (need === 'cooling') {
      const selectedCapacity = buildCoolingCapacity(area, coolingClimate);
      params.set('category', 'کولر گازی');
      params.set('capacity', String(selectedCapacity));
    }

    if (need === 'water') {
      const selectedCapacity = buildWaterCapacity(peopleCount);
      params.set('category', 'تصفیه آب');
      params.set('capacity', String(selectedCapacity));
    }

    router.push(`/products?${params.toString()}`);
    resetModal();
  };

  const recommendationText = useMemo(() => {
    if (!need) return 'برای شروع، نوع نیاز خود را انتخاب کنید';

    if (need === 'heating') {
      const selectedCapacity = buildHeatingCapacity(area, heatingClimate);
      return `بر اساس حدود ${area} متر مربع و اقلیم ${heatingClimate === 'mild' ? 'ملایم' : heatingClimate === 'normal' ? 'عادی' : heatingClimate === 'cold' ? 'سرد' : 'خیلی سرد'}، پیشنهاد ما برای پکیج شما ${selectedCapacity.toLocaleString('fa-IR')} kcal/hr است.`;
    }

    if (need === 'cooling') {
      const selectedCapacity = buildCoolingCapacity(area, coolingClimate);
      return `بر اساس حدود ${area} متر مربع و اقلیم ${coolingClimate === 'moderate-humid' ? 'معتدل و مرطوب' : coolingClimate === 'hot-dry' ? 'گرم و خشک' : 'گرم و مرطوب'}، پیشنهاد ما برای سیستم سرمایش ${selectedCapacity.toLocaleString('fa-IR')} BTU/hr است.`;
    }

    const selectedCapacity = buildWaterCapacity(peopleCount);
    return `برای ${peopleCount} نفر در خانه، ظرفیت پیشنهادی ${selectedCapacity.toLocaleString('fa-IR')} لیتر برای دستگاه تصفیه آب است.`;
  }, [area, coolingClimate, heatingClimate, need, peopleCount]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-[28px] bg-white p-5 shadow-2xl ring-1 ring-slate-200 sm:p-6">
        <button
          type="button"
          onClick={resetModal}
          className="absolute left-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="بستن"
        >
          <CloseIcon fontSize="small" />
        </button>

        <div className="mb-6 mt-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-main">Smart Selection</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-800">{stepTitle}</h2>
        </div>

        {currentStep === 1 && (
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { key: 'heating', label: 'گرمایش', description: 'پکیج و سیستم گرمایشی' },
              { key: 'cooling', label: 'سرمایش', description: 'کولر گازی و HVAC' },
              { key: 'water', label: 'تصفیه آب', description: 'دستگاه‌های آب' },
            ].map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => {
                  setNeed(option.key as NeedType);
                  setCurrentStep(2 as Step);
                }}
                className={`rounded-2xl border p-4 text-right transition ${
                  need === option.key
                    ? 'border-brand-main bg-brand-main/5 text-brand-main shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-brand-main hover:text-brand-main'
                }`}
              >
                <div className="text-lg font-bold">{option.label}</div>
                <div className="mt-2 text-xs leading-6 text-slate-500">{option.description}</div>
              </button>
            ))}
          </div>
        )}

        {currentStep === 2 && need === 'heating' && (
          <div className="space-y-3">
            {Object.entries(HEATING_COEFFICIENTS).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setHeatingClimate(key as HeatingClimate);
                  nextStep();
                }}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right transition hover:border-brand-main hover:bg-brand-main/5"
              >
                <span className="font-medium text-slate-700">
                  {key === 'mild' ? 'ملایم' : key === 'normal' ? 'عادی' : key === 'cold' ? 'سرد' : 'خیلی سرد'}
                </span>
                <span className="text-sm text-slate-500">{value} W/m²</span>
              </button>
            ))}
          </div>
        )}

        {currentStep === 2 && need === 'cooling' && (
          <div className="space-y-3">
            {Object.entries(COOLING_COEFFICIENTS).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setCoolingClimate(key as CoolingClimate);
                  nextStep();
                }}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right transition hover:border-brand-main hover:bg-brand-main/5"
              >
                <span className="font-medium text-slate-700">
                  {key === 'moderate-humid' ? 'معتدل و مرطوب' : key === 'hot-dry' ? 'گرم و خشک' : 'گرم و مرطوب'}
                </span>
                <span className="text-sm text-slate-500">{value} BTU/hr/m²</span>
              </button>
            ))}
          </div>
        )}

        {currentStep === 2 && need === 'water' && (
          <div className="space-y-3">
            {[
              { key: 'small', label: 'خانه کوچک', value: 2 },
              { key: 'medium', label: 'خانواده معمولی', value: 4 },
              { key: 'large', label: 'خانواده بزرگ', value: 6 },
              { key: 'heavy', label: 'مصرف بالا / چند واحد', value: 8 },
            ].map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => {
                  setWaterUsage(option.key as WaterUsage);
                  setPeopleCount(option.value);
                  nextStep();
                }}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right transition hover:border-brand-main hover:bg-brand-main/5"
              >
                <span className="font-medium text-slate-700">{option.label}</span>
                <span className="text-sm text-slate-500">{option.value} نفر</span>
              </button>
            ))}
          </div>
        )}

        {currentStep === 3 && need !== 'water' && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              متراژ تقریبی خانه یا واحد شما (متر مربع)
            </label>
            <input
              type="range"
              min={30}
              max={400}
              step={10}
              value={area}
              onChange={(event) => setArea(Number(event.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-main"
            />
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>30 m²</span>
              <span className="rounded-full bg-brand-main/10 px-3 py-1 font-semibold text-brand-main">
                {area.toLocaleString('fa-IR')} m²
              </span>
              <span>400 m²</span>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-main px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-200"
              >
                ادامه
                <ArrowForwardIcon fontSize="small" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && need === 'water' && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              تعداد اعضای خانواده
            </label>
            <input
              type="range"
              min={1}
              max={12}
              step={1}
              value={peopleCount}
              onChange={(event) => setPeopleCount(Number(event.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-main"
            />
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>1 نفر</span>
              <span className="rounded-full bg-brand-main/10 px-3 py-1 font-semibold text-brand-main">
                {peopleCount.toLocaleString('fa-IR')} نفر
              </span>
              <span>12 نفر</span>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-main px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-200"
              >
                ادامه
                <ArrowForwardIcon fontSize="small" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
              {recommendationText}
            </div>

            <div className="rounded-2xl border border-brand-main/20 bg-brand-main/5 p-4 text-sm text-slate-700">
              <p className="font-semibold text-brand-main">پیشنهاد نهایی</p>
              <p className="mt-2 leading-7">
                {need === 'heating' && 'دسته‌بندی: پکیج'}
                {need === 'cooling' && 'دسته‌بندی: کولر گازی'}
                {need === 'water' && 'دسته‌بندی: تصفیه آب'}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={previousStep}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              >
                <ArrowBackIcon fontSize="small" />
                برگشت
              </button>

              <button
                type="button"
                onClick={onSubmit}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-main px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-200"
              >
                نمایش محصولات
              </button>
            </div>
          </div>
        )}

        {currentStep < 4 && (
          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={previousStep}
              disabled={currentStep === 1}
              className="rounded-full border border-slate-200 px-3 py-2 text-xs text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              قبلی
            </button>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((step) => (
                <span
                  key={step}
                  className={`h-2.5 w-2.5 rounded-full ${
                    step <= currentStep ? 'bg-brand-main' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={resetModal}
              className="rounded-full border border-slate-200 px-3 py-2 text-xs text-slate-600"
            >
              انصراف
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
