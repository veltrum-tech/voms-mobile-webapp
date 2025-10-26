import { TypographySmall } from "../../../shared/components";

const RegisterForm = () => {
    return (
        <div>
            <div className="grid w-full md:mt-5 md:gap-5">
                <div className="text-center">
                    <TypographySmall className="mt-4 leading-4">
                        Enter your Credentials and Bio-data to Register your account
                    </TypographySmall>
                </div>
            </div>
        </div>
    );
};

export { RegisterForm };
