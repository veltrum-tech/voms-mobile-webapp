import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/components";

const SelectOptionView = () => {
  const navigate = useNavigate();

  const handleCertificateMigration = () => {
    navigate("/app/certificate-request/enter-vin");
  };

  const handleChangeOfOwnership = () => {
    navigate("/app/change-ownership/enter-cert-no");
  };

  const handleGoBack = () => {
    navigate("/presentation");
  };


  return (
    <main className="max-w-[720px] mx-auto">
      <Button onClick={handleGoBack} variant={'icon'} className="text-white items-start -ml-4"><IoIosArrowBack size={25} /><span className="text-lg">Back</span></Button>
      <main className="items-center mx-auto flex flex-col justify-center">

        <div className="bg-white p-5 md:px-20 py-16">
          {/* Section Header */}
          <div className="mb-16"> <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#8D8989] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              SERVICE OPTIONS
            </h2>
          </div>
            <p className="text-gray-600 text-sm mb-8">
              Please click on the desired option to begin.
            </p></div>

          {/* Options */}
          <div className="space-y-4">
            {/* Certificate Migration */}
            <div
              onClick={handleCertificateMigration}
              className="group flex gap-4 items-center justify-between border-2 border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-[#B41662] cursor-pointer transition"
            >
              <div>
                <h3 className="text-base font-semibold text-gray-800 transition group-hover:text-[#B41662]">
                  Certificate Migration
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  This option is for converting your current (existing) Proof of
                  Ownership Certificate to the new digital certificate.
                </p>
              </div>
              <IoIosArrowForward size={40} className="text-gray-400 border-l-2 transition group-hover:text-[#B41662]" />
            </div>

            {/* Change of Vehicle Ownership */}
            <div
              onClick={handleChangeOfOwnership}
              className="group flex gap-4 items-center justify-between border-2 border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-[#B41662] cursor-pointer transition"
            >
              <div>
                <h3 className="text-base font-semibold text-gray-800 transition group-hover:text-[#B41662]">
                  Change of Vehicle Ownership
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Use this to start the process of getting a Proof of Ownership
                  Certificate for a new owner upon a vehicle sale or transfer.
                </p>
              </div>
              <IoIosArrowForward size={40} className="text-gray-400 border-l-2 transition group-hover:text-[#B41662]" />
            </div>
          </div>
        </div>
      </main>
    </main>
  );
};

export { SelectOptionView };
