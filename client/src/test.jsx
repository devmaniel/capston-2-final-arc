import React from 'react'

// import the style here

const test = () => {
    return (
        <>
          <nav className="bg-blue-500 w-full h-[50px]"></nav>
    
          <section className="flex justify-center  mt-5 ">
            <div className=" h-[600px] rounded-md w-[1100px] p-[50px] shadow-style">
              <div className="flex gap-10 book-shelf pl-[30px]">
                <div>01</div>
                <div>01</div>
                <div>01</div>
                <div>01</div>
              </div>
              <div className="shelf-bottom w-full  h-[10px]"></div>
            </div>
          </section>
        </>
      );
}

export default test
