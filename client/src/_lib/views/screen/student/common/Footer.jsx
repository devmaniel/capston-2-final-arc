import { BsBookFill } from "react-icons/bs";
import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <>
      <div className="bg-neutral w-full"> 
        <div className="flex justify-evenly items-center mt-10 overflow-x-scroll space-x-4">
          <div className="flex-shrink-0 mt-10 mb-5 mx-4 sm:mx-0">
            <a
              href="https://www.facebook.com/bagbarrioshs/?locale=tl_PH"
              target="_blank"
              class="link link-hover"
            >
              <img src="/images/logo.png" className="h-[150px] w-[150px] bg-white rounded-[50%]" />
            </a>
          </div>
          <div className="flex-shrink-0 mx-4">
            <a
              href="https://www.deped.gov.ph/"
              target="_blank"
              class="link link-hover"
            >
              <img src="/images/deped.png" className="h-[150px]" />
            </a>
          </div>
          <div className="flex-shrink-0 mx-4">
            <a
              href="https://depedcaloocan.com/"
              target="_blank"
              class="link link-hover"
            >
              <img src="/images/do.png" className="h-[150px] w-[150px]" />
            </a>
          </div>
          <div className="flex-shrink-0 mx-4">
            <a
              href="https://www.facebook.com/bagbarrioshs/?locale=tl_PH"
              target="_blank"
              class="link link-hover"
            >
              <img src="/images/logo.png" className="h-[150px] w-[150px]" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer bg-neutral text-neutral-content p-10 flex sm:flex sm:justify-between sm:flex-row sm:items-center flex-col  ">
        <nav className="text-center ">
          <h6 className="footer-title">Resources</h6>
          <a
            href="https://www.deped.gov.ph/"
            target="_blank"
            class="link link-hover"
          >
            DepEd
          </a>

          <a
            href="https://depedcaloocan.com/"
            target="_blank"
            className="link link-hover"
          >
            Division Office of Caloocan
          </a>
        </nav>
        <nav>
          <h6
            className="footer-title"
            activeProps={{ className: "text-primary font-black" }}
            activeOptions={{ exact: true }}
          >
            School
          </h6>
          <Link to="/student/about" className="link link-hover">
            About School
          </Link>
          <Link to="/student/contact/Contact" className="link link-hover">
            Contact
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link to="/student/termsOfuse/Terms" className="link link-hover">
            Terms of use
          </Link>
          <Link to="/student/privacy/Privacy" className="link link-hover">
            Privacy policy
          </Link>
        </nav>
      </div>

      <div className="footer footer-center p-10 bg-primary text-primary-content">
        <aside>
          <BsBookFill className="text-5xl " />
          <p className="font-bold pt-2">
            Bagong Barrio Senior High School Library. <br />
            Providing Reliable Library Since it's started
          </p>
          <p>Copyright © 2024 - All right reserved</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
