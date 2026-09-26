export default function Footer() {
    return (
        <div className=" bg-brand-200 w-full py-16 px-10 text-white">
            <div className="grid grid-cols-3 gap-30">
                {/* right */}
                <div className="flex flex-col text-left gap-8">
                    <p>Hello</p>
                    <p>Hello</p>
                    <p>Hello</p>
                    <p>Hello</p>
                </div>

                {/* center */}
                <div className="flex flex-col text-center text-2xl gap-5">
                    <h4>داراب Darab</h4>
                    <p className="text-base">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Labore at veniam libero distinctio asperiores quasi ipsam ab sed facilis praesentium,
                        voluptatum quo blanditiis illo expedita eos dignissimos neque consequatur culpa?
                    </p>
                </div>

                {/* left */}
                <div className="flex flex-col text-right gap-8">
                    <p>Hello</p>
                    <p>Hello</p>
                    <p>Hello</p>
                    <p>Hello</p>
                </div>
            </div>
        </div>
    )
}