import { useNavigate } from "react-router-dom";
import { Button, TypographyH2, TypographyH6 } from "../../../shared/components";

export default function PresentationView() {
  const navigate = useNavigate();

  return (
    <div>
      <main className="h-full flex container mx-auto flex-col">
        <section className="h-full flex flex-col justify-center text-white">
          <div className="flex text-center items-center">
            <TypographyH2 className="text-white ">
              Vehicle Ownership Management System <br /> <span className="text-[#DB408A]">(VOMS)</span>
            </TypographyH2>
          </div>
          <TypographyH6 className="mt-8 lg:w-2/5 text-white text-center lg:text-start">
           A portal to get the new digital Proof of Ownership Certificate, and for facilitating vehicle ownership transfers.
          </TypographyH6>
        </section>
        <div className="flex justify-center lg:justify-start">
          <Button
            className="mt-8 text-base rounded-sm"
            onClick={() => navigate("/select-option")}
          >
            Click to Get Started
          </Button>
        </div>
      </main>
    </div>
  );
}
