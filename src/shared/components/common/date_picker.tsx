import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Icon } from "../../../assets/icons/icons";

// Define prop types
interface CustomDatePickerProps {
  mode?: "month" | "year" | "month-year";
  placeholder?: string;
  showIcon?: boolean;
}

const CustomDatePicker = ({
  mode = "month-year",
  placeholder = "Select date",
  showIcon = false,
}: CustomDatePickerProps) => {
  // Explicitly type as Date | null
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Picker config based on mode
  const getPickerConfig = () => {
    switch (mode) {
      case "month":
        return {
          showMonthYearPicker: true,
          dateFormat: "MMMM",
        };
      case "year":
        return {
          showYearPicker: true,
          dateFormat: "yyyy",
        };
      case "month-year":
      default:
        return {
          showMonthYearPicker: true,
          dateFormat: "MMMM yyyy",
        };
    }
  };

  return (
    <div className="relative w-full">
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        className={`w-full rounded-lg border border-gray-300 px-${
          showIcon ? "10" : "3"
        } py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary`}
        placeholderText={placeholder}
        {...getPickerConfig()}
      />
      {showIcon && (
        <Icon
          name="calender"
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      )}
    </div>
  );
};

export default CustomDatePicker;
