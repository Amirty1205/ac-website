import {
  Build,
  CheckCircleOutlined,
  Engineering,
  Handyman,
  LightbulbOutlined,
  SettingsSuggest,
  Tune,
} from "@mui/icons-material";
import { CTAButton } from "../../components/CTAbutton";

const services = [
  {
    number: "۰۱",
    icon: <LightbulbOutlined />,
    title: "مشاوره و راهنمایی",
    description:
      "انتخاب سیستم سرمایشی، گرمایشی یا تهویه مناسب، همیشه با مقایسه چند محصول و انتخاب ارزان‌ترین گزینه انجام نمی‌شود. شرایط ساختمان، متراژ، کاربری فضا، موقعیت پروژه، میزان استفاده و بودجه، همگی در انتخاب تجهیزات مناسب تأثیرگذار هستند.",
    detail:
      "در داراب ابتدا شرایط و نیاز شما را بررسی می‌کنیم و سپس گزینه‌هایی را که از نظر ظرفیت، عملکرد، مصرف انرژی و هزینه برای پروژه شما مناسب هستند معرفی می‌کنیم تا بتوانید با آگاهی بیشتری تصمیم بگیرید.",
    points: [
      "بررسی شرایط و نیازهای پروژه",
      "راهنمایی برای انتخاب تجهیزات مناسب",
      "مقایسه گزینه‌های متناسب با بودجه",
    ],
  },
  {
    number: "۰۲",
    icon: <Engineering />,
    title: "طراحی و اجرای مهندسی",
    description:
      "ما معتقدیم انتخاب یک محصول مناسب، تنها بخشی از یک راهکار موفق است. هر پروژه شرایط خاص خودش را دارد و تجهیزات باید متناسب با نیاز واقعی آن انتخاب و اجرا شوند.",
    detail:
      "در این مرحله، نیازهای پروژه را به‌صورت تخصصی بررسی می‌کنیم، ظرفیت و نوع تجهیزات مناسب را مشخص می‌کنیم و راهکار انتخاب‌شده را متناسب با شرایط ساختمان اجرا می‌کنیم. هدف این است که محصولی که تهیه می‌شود، واقعاً پاسخگوی نیاز شما باشد و در شرایط واقعی پروژه عملکرد مناسبی داشته باشد.",
    points: [
      "بررسی مهندسی نیازهای پروژه",
      "انتخاب ظرفیت و تجهیزات متناسب",
      "اجرای راهکار متناسب با شرایط ساختمان",
    ],
  },
  {
    number: "۰۳",
    icon: <SettingsSuggest />,
    title: "نصب و راه‌اندازی",
    description:
      "حتی بهترین تجهیزات نیز در صورت نصب نادرست نمی‌توانند عملکرد مطلوبی داشته باشند. نصب اصولی، تنظیم صحیح و راه‌اندازی دقیق، بخش مهمی از عملکرد و طول عمر سیستم‌های تهویه و تأسیسات هستند.",
    detail:
      "تجهیزات پس از تهیه، توسط نیروهای متخصص نصب و راه‌اندازی می‌شوند. در فرآیند نصب، شرایط محل و الزامات فنی دستگاه در نظر گرفته شده و پس از راه‌اندازی، عملکرد سیستم بررسی می‌شود تا تجهیزات آماده استفاده باشند.",
    points: [
      "نصب اصولی و مطابق الزامات فنی",
      "تنظیم و راه‌اندازی تجهیزات",
      "بررسی عملکرد سیستم پس از نصب",
    ],
  },
  {
    number: "۰۴",
    icon: <Handyman />,
    title: "تعمیرات تخصصی",
    description:
      "خرابی تجهیزات سرمایشی و گرمایشی همیشه به معنای نیاز به تعویض دستگاه نیست. بسیاری از مشکلات، در صورت تشخیص صحیح، قابل تعمیر و رفع هستند.",
    detail:
      "در تعمیرات، ابتدا علائم و عملکرد دستگاه بررسی می‌شود تا علت اصلی مشکل مشخص شود. سپس با توجه به نوع خرابی، اقدامات لازم برای تعمیر و بازگرداندن دستگاه به شرایط کاری مناسب انجام می‌شود. هدف ما صرفاً برطرف کردن علامت خرابی نیست؛ بلکه پیدا کردن علت اصلی مشکل است.",
    points: [
      "عیب‌یابی و بررسی علت خرابی",
      "تعمیر تخصصی تجهیزات",
      "بررسی عملکرد پس از تعمیر",
    ],
  },
  {
    number: "۰۵",
    icon: <Tune />,
    title: "سرویس‌های دوره‌ای",
    description:
      "سرویس و نگهداری منظم تجهیزات می‌تواند از بسیاری از خرابی‌های ناگهانی جلوگیری کند. تجمع آلودگی، کاهش راندمان قطعات و تنظیم نبودن سیستم می‌تواند به مرور زمان عملکرد دستگاه را تحت تأثیر قرار دهد.",
    detail:
      "در سرویس‌های دوره‌ای، وضعیت عملکرد تجهیزات بررسی و بخش‌های مختلف سیستم کنترل می‌شوند. این کار علاوه بر کمک به حفظ عملکرد مناسب دستگاه، می‌تواند مشکلات احتمالی را پیش از تبدیل شدن به خرابی‌های جدی‌تر شناسایی کند.",
    points: [
      "بررسی وضعیت و عملکرد تجهیزات",
      "تمیزکاری و کنترل بخش‌های مختلف",
      "شناسایی زودهنگام مشکلات احتمالی",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#fafaf9]" dir="rtl">
      {/* Hero */}
      <section className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:px-12 lg:pb-28 lg:pt-32">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-200/40 px-4 py-2 text-sm font-medium text-brand-main">
              <Build fontSize="small" />
              خدمات داراب
            </div>

            <h1 className="text-4xl font-black leading-[1.4] tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
              از انتخاب و طراحی
              <br />
              تا <span className="text-brand-main">نصب و نگهداری</span>
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-9 text-gray-500 sm:text-lg">
              خدمات داراب تنها به تأمین و فروش تجهیزات محدود نمی‌شود. ما در
              تمام مسیر، از شناخت نیاز و انتخاب راهکار مناسب تا نصب، راه‌اندازی،
              تعمیر و نگهداری تجهیزات در کنار شما هستیم تا سیستم شما عملکردی
              مطمئن، متناسب و پایدار داشته باشد.
            </p>
          </div>

          {/* Service overview */}
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
            {services.map((service) => (
              <div
                key={service.number}
                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-200/40 text-brand-main">
                  {service.icon}
                </div>

                <span className="text-xs font-bold text-gray-300">
                  {service.number}
                </span>

                <h2 className="mt-1 text-sm font-bold text-gray-800 sm:text-base">
                  {service.title}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-bold text-brand-main">
            خدمات تخصصی ما
          </p>

          <h2 className="text-3xl font-black leading-[1.5] text-gray-900 sm:text-4xl">
            راهکار مناسب، از شناخت نیاز شروع می‌شود
          </h2>

          <p className="mt-5 leading-8 text-gray-500">
            هر ساختمان و هر پروژه شرایط متفاوتی دارد. به همین دلیل تلاش می‌کنیم
            خدمات خود را متناسب با نیاز واقعی شما ارائه کنیم؛ از مشاوره اولیه
            گرفته تا اجرای سیستم و خدمات پس از آن.
          </p>
        </div>

        <div className="space-y-6">
          {services.map((service) => (
            <article
              key={service.number}
              className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <div className="grid lg:grid-cols-[140px_1fr]">
                {/* Number */}
                <div className="hidden items-start justify-center bg-brand-200/20 pt-12 lg:flex">
                  <span className="text-5xl font-black text-brand-main/20">
                    {service.number}
                  </span>
                </div>

                <div className="p-7 sm:p-9 lg:p-11">
                  {/* Header */}
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-200/40 text-brand-main">
                      {service.icon}
                    </div>

                    <div>
                      <span className="text-xs font-bold text-brand-main lg:hidden">
                        خدمت {service.number}
                      </span>

                      <h3 className="mt-1 text-2xl font-black text-gray-900 sm:text-3xl">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                      <p className="leading-9 text-gray-600">
                        {service.description}
                      </p>

                      <p className="mt-5 leading-9 text-gray-500">
                        {service.detail}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="rounded-2xl bg-[#fafaf9] p-6">
                      <p className="mb-5 text-sm font-bold text-gray-900">
                        این خدمت شامل:
                      </p>

                      <ul className="space-y-4">
                        {service.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-3 text-sm leading-6 text-gray-600"
                          >
                            <CheckCircleOutlined
                              fontSize="small"
                              className="mt-0.5 shrink-0 text-brand-main"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-main px-7 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-black leading-[1.5] sm:text-4xl">
              برای انتخاب راهکار مناسب
              <br />
              با ما مشورت کنید.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-white/75">
              اگر برای انتخاب، نصب یا نگهداری تجهیزات پروژه خود نیاز به
              راهنمایی دارید، کارشناسان داراب آماده پاسخ‌گویی و ارائه راهکار
              مناسب هستند.
            </p>

            <div className="mt-8">
              <CTAButton title="" text="تماس بگیرید" />
            </div>
          </div>

          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-32 right-10 h-80 w-80 rounded-full bg-white/5" />
        </div>
      </section>
    </main>
  );
}