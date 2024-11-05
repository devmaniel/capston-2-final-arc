const RequestOut = () => {
  return (
    <>
      <div className="m-auto w-[900px] h-96 bg-neutral flex text-base-100 ">
        <div className="h-full border-2 border-base-100 w-[70%]">
          <div className="w-full h-10 border-b-2 border-base-100 font-bold p-2 mb-10">
            Total: 1
          </div>

          <div action="" className="flex p-2 gap-5 h-32 border border-primary">
            <img
              src="/Book Image/no-image.png"
              className="h-32 rounded-md"
              alt=""
            />

            <div className="w-full   ">
              <div className="flex w-full items-center justify-between h-12 o">
                <h1 className="title tracking-[1px] sm:tracking-[2px] lg:tracking-[3px] text-[18px] sm:text-[20px] md:text-[22px] lg:text-[25px] font-black">
                  Isang Kaibigan
                 
                </h1>
              </div>

              <p className="title text-[10px] sm:text-[11px] lg:text-[12px] text-black my-1">
                Book name: <span className="text-gray-500">Isang Kaibihan</span>
              </p>
              <p className="title text-[10px] sm:text-[11px] lg:text-[12px] text-black my-1">
                Book name: <span className="text-gray-500">Isang Kaibihan</span>
              </p>
              <p className="title text-[10px] sm:text-[11px] lg:text-[12px] text-black my-1">
                Book name: <span className="text-gray-500">Isang Kaibihan</span>
              </p>

            </div>
          </div>
        </div>
        <div className="h-full border-2 border-base-100 w-[30%] p-2"></div>
      </div>
    </>
  );
};

export default RequestOut;
