import RightArrow from "../../../assets/icons/RightArrow";
import ThreeDots from "../../../assets/icons/ThreeDots";

import classes from "./Questionbank.module.css";

function UnitBank() {
  return (
    <div className="bg-white w-full px-3 rounded-xl">
      <h3 className="py-3 font-poppins text-lg font-normal leading-10 tracking-normal">
        Unit 1 Bank
      </h3>

      <div className="flex gap-3 ">
        <p
          className={`${classes.txt} poppins text-xs font-normal leading-5 tracking-normal `}
        >
          Question bank
        </p>
        <div className="flex items-center ">
          <RightArrow />
        </div>
        <div className="font-poppins text-sm font-xs leading-5 tracking-normal text-gray-500">
          <p>Unit 1 bank</p>
        </div>
      </div>

      <div className="py-14">
        <div className="flex justify-center py-2">
          <div
            className={`${classes.card} flex justify-between  border border-gray-200 rounded-lg`}
          >
            <div>
              <p className="p-2 font-poppins text-base font-normal leading-6 tracking-normal">
                Which of the following aspects of our did you find most
                impressive ...?
              </p>
            </div>
            <div className="flex items-center pe-5">
              <ThreeDots />
            </div>
          </div>
        </div>

        <div className="flex justify-center py-2">
          <div
            className={`${classes.card} flex justify-between  border border-gray-200 rounded-lg`}
          >
            <div>
              <p className="p-2 font-poppins text-base font-normal leading-6 tracking-normal">
                Which of the following aspects of our did you find most
                impressive ...?
              </p>
            </div>
            <div className="flex items-center pe-5">
              <ThreeDots />
            </div>
          </div>
        </div>

        <div className="flex justify-center py-2">
          <div
            className={`${classes.card} flex justify-between  border border-gray-200 rounded-lg`}
          >
            <div>
              <p className="p-2 font-poppins text-base font-normal leading-6 tracking-normal">
                Which of the following aspects of our did you find most
                impressive ...?
              </p>
            </div>
            <div className="flex items-center pe-5">
              <ThreeDots />
            </div>
          </div>
        </div>
        <div className="flex justify-center py-2">
          <div
            className={`${classes.card} flex justify-between  border border-gray-200 rounded-lg`}
          >
            <div>
              <p className="p-2 font-poppins text-base font-normal leading-6 tracking-normal">
                Which of the following aspects of our did you find most
                impressive ...?
              </p>
            </div>
            <div className="flex items-center pe-5">
              <ThreeDots />
            </div>
          </div>
        </div>
        x``
        <div className="flex justify-center py-2">
          <div
            className={`${classes.card} flex justify-between  border border-gray-200 rounded-lg`}
          >
            <div>
              <p className="p-2 font-poppins text-base font-normal leading-6 tracking-normal">
                Which of the following aspects of our did you find most
                impressive ...?
              </p>
            </div>
            <div className="flex items-center pe-5">
              <ThreeDots />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center sm:justify-end py-5 ">
        <div className="flex">
          <button className="bg-active text-white rounded-lg px-8 py-1 m-0 p-0">
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
}
export default UnitBank;
