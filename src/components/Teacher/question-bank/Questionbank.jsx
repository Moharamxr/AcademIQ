import AddPostIcon from "../../../assets/icons/AddPostIcon";
import classes from "./Questionbank.module.css";

function QuestionBank() {
  return (
    <div className="w-full rounded-xl bg-white px-3">
      <div className="bg-white m-1">
        <div className="flex justify-between">
          <div>
            <h3 className="py-3 font-poppins text-2xl font-normal leading-10 tracking-normal">
              Question Bank
            </h3>
          </div>
          <div className="p-3">
            {/* <DropdownButton /> */}
          </div>
        </div>

        <button
          className={`${classes.bt} flex items-center gap-x-2 border  p-2 rounded-lg`}
        >
          <div className={` flex-shrink-0`}>
            <AddPostIcon className={`w-5 h-5`} />
          </div>
          <div
            className={`${classes.txt} font-poppins text-sm font-normal leading-6 tracking-normal`}
          >
            Create question bank
          </div>
          {/* hidden sm:block */}
        </button>

        <div className=" py-12">
          <p className="font-poppins text-base font-normal leading-10 tracking-normal">
            Existing Question Banks:
          </p>
        </div>

        <div>
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="cardsContainer flex justify-center my-4"
            >
              <div
                className={`${classes.card}  flex justify-between border border-gray-200 rounded-lg p-2`}
              >
                <div>
                  <p>Unit 1 bank</p>
                </div>
                <div>
                  <p>112 questions</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionBank;
