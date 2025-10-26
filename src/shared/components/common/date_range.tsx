import { type FunctionComponent, useState, useEffect } from "react";
// @ts-ignore
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { LucideCalendarRange } from "lucide-react";

type DateRangeType = Range;

interface Props {
  onChange: (dateRange: DateRangeType) => void;
  showIcon?: boolean;
  dateRangeValue: Range;
}

const DateRangePicker: FunctionComponent<Props> = ({ onChange, showIcon, dateRangeValue }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeType>(dateRangeValue);

  // ✅ keep state in sync with parent
  useEffect(() => {
    setDateRange(dateRangeValue);
  }, [dateRangeValue]);

  const handleSelect = (ranges: RangeKeyDict) => {
    const selectedRange = ranges.selection;
    const newRange = {
      startDate: selectedRange.startDate || undefined,
      endDate: selectedRange.endDate || undefined,
      key: "selection",
    };
    setDateRange(newRange);
    onChange(newRange);
    setShowPicker(false);
  };

  return (
   <div className="flex flex-col relative">
      <label className="text-sm text-gray-700 mb-1">Date</label>
      <div
        className="flex items-center rounded-xl px-4 py-2 border border-input bg-secondary-200 focus-within:ring-2 focus-within:ring-primary cursor-pointer"
        onClick={() => setShowPicker(!showPicker)}
      >
        <input
          type="text"
          value={
            dateRange?.startDate && dateRange?.endDate
              ? `${format(dateRange.startDate, "MM/dd/yyyy")} - ${format(
                  dateRange.endDate,
                  "MM/dd/yyyy"
                )}`
              : ""
          }
          placeholder="From - To"
          readOnly
          className="w-full border-transparent ring-0 bg-transparent text-gray-500 placeholder-gray-400 outline-none focus:border-transparent focus:ring-0 cursor-pointer"
        />
        {showIcon && <LucideCalendarRange className="text-primary" />}
      </div>
      {showPicker && (
        <div className="absolute top-full mt-2 border border-primary bg-white shadow-lg rounded-lg z-10">
          <DateRange
            editableDateInputs
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={[dateRange]}
          />
        </div>
      )}
    </div>
    );
};

export default DateRangePicker;