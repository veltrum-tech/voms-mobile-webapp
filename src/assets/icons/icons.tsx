// Icons should be re-usable functional components

import type { SVGProps } from "react";
import { cn } from "../../lib/utils";

interface IconProps extends SVGProps<SVGSVGElement> {
  name?: string;
  variant?: "solid" | "outline";
  className?: string;
  strokeWidth?: number;
}
export const icons = {
  //{* OUTLINE ICONS *}//
  outline: {
    "third-party": ({
      strokeWidth,
      className,
      ...props
    }: SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-6 w-6 stroke-current", className)}
        {...props}
      >
        <path
          d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z"
          stroke="#02915C"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z"
          stroke="#02915C"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9 13.0098H12"
          stroke="#02915C"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9 9.00977H12"
          stroke="#02915C"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.99561 13H6.00459"
          stroke="#02915C"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.99561 9H6.00459"
          stroke="#02915C"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),

    dashboard: ({ className, ...props }: SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-6 w-6 stroke-current", className)}
        {...props}
      >
        <path
          d="M12 18V15"
          stroke="#02915C"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.07 2.81985L3.14002 8.36985C2.36002 8.98985 1.86002 10.2998 2.03002 11.2798L3.36002 19.2398C3.60002 20.6598 4.96002 21.8098 6.40002 21.8098H17.6C19.03 21.8098 20.4 20.6498 20.64 19.2398L21.97 11.2798C22.13 10.2998 21.63 8.98985 20.86 8.36985L13.93 2.82985C12.86 1.96985 11.13 1.96985 10.07 2.81985Z"
          stroke="#02915C"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    "user-management": ({ className, ...props }: SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-6 w-6 stroke-current", className)}
        stroke="currentColor"
        strokeWidth="2"
        {...props}
      >
        <path
          d="M18 7.16C17.94 7.15 17.87 7.15 17.81 7.16C16.43 7.11 15.33 5.98 15.33 4.58C15.33 3.15 16.48 2 17.91 2C19.34 2 20.49 3.16 20.49 4.58C20.48 5.98 19.38 7.11 18 7.16Z"
          stroke="#02915C"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.9699 14.4402C18.3399 14.6702 19.8499 14.4302 20.9099 13.7202C22.3199 12.7802 22.3199 11.2402 20.9099 10.3002C19.8399 9.59016 18.3099 9.35016 16.9399 9.59016"
          stroke="#02915C"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.96998 7.16C6.02998 7.15 6.09998 7.15 6.15998 7.16C7.53998 7.11 8.63998 5.98 8.63998 4.58C8.63998 3.15 7.48998 2 6.05998 2C4.62998 2 3.47998 3.16 3.47998 4.58C3.48998 5.98 4.58998 7.11 5.96998 7.16Z"
          stroke="#02915C"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.99994 14.4402C5.62994 14.6702 4.11994 14.4302 3.05994 13.7202C1.64994 12.7802 1.64994 11.2402 3.05994 10.3002C4.12994 9.59016 5.65994 9.35016 7.02994 9.59016"
          stroke="#02915C"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 14.6302C11.94 14.6202 11.87 14.6202 11.81 14.6302C10.43 14.5802 9.32996 13.4502 9.32996 12.0502C9.32996 10.6202 10.48 9.47021 11.91 9.47021C13.34 9.47021 14.49 10.6302 14.49 12.0502C14.48 13.4502 13.38 14.5902 12 14.6302Z"
          stroke="#02915C"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.08997 17.7804C7.67997 18.7204 7.67997 20.2603 9.08997 21.2003C10.69 22.2703 13.31 22.2703 14.91 21.2003C16.32 20.2603 16.32 18.7204 14.91 17.7804C13.32 16.7204 10.69 16.7204 9.08997 17.7804Z"
          stroke="#02915C"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    deduction: ({ className, ...props }: SVGProps<SVGSVGElement>) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-6 w-6 text-current", className)}
        {...props}
      >
        <path
          d="M20.9427 16.8354C20.2864 12.8866 18.2432 9.94613 16.467 8.219C15.9501 7.71642 15.6917 7.46513 15.1208 7.23257C14.5499 7 14.0592 7 13.0778 7H10.9222C9.94081 7 9.4501 7 8.87922 7.23257C8.30834 7.46513 8.04991 7.71642 7.53304 8.219C5.75682 9.94613 3.71361 12.8866 3.05727 16.8354C2.56893 19.7734 5.27927 22 8.30832 22H15.6917C18.7207 22 21.4311 19.7734 20.9427 16.8354Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.25662 4.44287C7.05031 4.14258 6.75128 3.73499 7.36899 3.64205C8.00392 3.54651 8.66321 3.98114 9.30855 3.97221C9.89237 3.96413 10.1898 3.70519 10.5089 3.33548C10.8449 2.94617 11.3652 2 12 2C12.6348 2 13.1551 2.94617 13.4911 3.33548C13.8102 3.70519 14.1076 3.96413 14.6914 3.97221C15.3368 3.98114 15.9961 3.54651 16.631 3.64205C17.2487 3.73499 16.9497 4.14258 16.7434 4.44287L15.8105 5.80064C15.4115 6.38146 15.212 6.67187 14.7944 6.83594C14.3769 7 13.8373 7 12.7582 7H11.2418C10.1627 7 9.6231 7 9.20556 6.83594C8.78802 6.67187 8.5885 6.38146 8.18945 5.80064L7.25662 4.44287Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
        <path
          d="M14.4012 17.3694C14.4012 17.5166 14.3552 17.6255 14.2632 17.6961C14.1742 17.7666 14.0684 17.8019 13.9457 17.8019H13.4764C13.369 17.8019 13.277 17.7912 13.2003 17.7697C13.1236 17.7452 13.0531 17.7053 12.9886 17.6501C12.9242 17.5918 12.8598 17.5151 12.7954 17.42C12.734 17.3218 12.6635 17.1976 12.5837 17.0473L11.8475 15.6669H10.5362V17.6225C10.5362 17.6531 10.5285 17.6807 10.5132 17.7053C10.5009 17.7298 10.4748 17.7513 10.435 17.7697C10.3951 17.785 10.3414 17.7973 10.2739 17.8065C10.2064 17.8157 10.1175 17.8203 10.0071 17.8203C9.89969 17.8203 9.81227 17.8157 9.74478 17.8065C9.6773 17.7973 9.62515 17.785 9.58834 17.7697C9.55153 17.7513 9.52546 17.7298 9.51012 17.7053C9.49785 17.6807 9.49171 17.6531 9.49171 17.6225V15.6669H8.99938C8.95337 15.6669 8.91656 15.6393 8.88895 15.5841C8.86135 15.5258 8.84754 15.4384 8.84754 15.3218C8.84754 15.2053 8.85674 15.1209 8.87515 15.0688C8.89662 15.0136 8.9319 14.986 8.98098 14.986H9.49171V14.3832H8.98098C8.93497 14.3832 8.90122 14.3571 8.87975 14.305C8.85828 14.2528 8.84754 14.1654 8.84754 14.0427C8.84754 13.9169 8.86135 13.8295 8.88895 13.7804C8.91963 13.7314 8.95644 13.7068 8.99938 13.7068H9.49171V12.2712C9.49171 12.124 9.53312 12.0151 9.61595 11.9445C9.70184 11.874 9.80613 11.8387 9.92883 11.8387H10.5316C10.6451 11.8387 10.7417 11.8495 10.8215 11.8709C10.9012 11.8893 10.9718 11.9231 11.0331 11.9722C11.0975 12.0212 11.1558 12.0856 11.208 12.1654C11.2632 12.2421 11.323 12.3403 11.3874 12.4599L12.05 13.7068H13.3567V12.0182C13.3567 11.9875 13.3629 11.9599 13.3751 11.9353C13.3905 11.9108 13.4166 11.8909 13.4534 11.8755C13.4932 11.8571 13.5469 11.8433 13.6144 11.8341C13.6819 11.8249 13.7693 11.8203 13.8767 11.8203C13.984 11.8203 14.0715 11.8249 14.139 11.8341C14.2064 11.8433 14.2601 11.8571 14.3 11.8755C14.3399 11.8909 14.3659 11.9108 14.3782 11.9353C14.3936 11.9599 14.4012 11.9875 14.4012 12.0182V13.7068H14.8936C14.9396 13.7068 14.9764 13.7314 15.004 13.7804C15.0316 13.8295 15.0454 13.9169 15.0454 14.0427C15.0454 14.1654 15.0316 14.2528 15.004 14.305C14.9764 14.3571 14.9396 14.3832 14.8936 14.3832H14.4012V14.986H14.8936C14.9396 14.986 14.9764 15.0136 15.004 15.0688C15.0316 15.1209 15.0454 15.2053 15.0454 15.3218C15.0454 15.4384 15.0316 15.5258 15.004 15.5841C14.9764 15.6393 14.9396 15.6669 14.8936 15.6669H14.4012V17.3694ZM10.5362 14.986H11.484L11.1666 14.3832H10.5362V14.986ZM12.5469 14.6363L12.7218 14.986H13.3567V14.3832H12.4089L12.5469 14.6363ZM10.5086 12.9844H10.4994C10.5055 13.1133 10.5101 13.236 10.5132 13.3525C10.5193 13.4691 10.5239 13.5872 10.527 13.7068H10.8261C10.7647 13.578 10.7064 13.4507 10.6512 13.3249C10.596 13.1991 10.5485 13.0856 10.5086 12.9844ZM13.3798 16.3341H13.3844C13.3782 16.2268 13.3736 16.1179 13.3705 16.0074C13.3675 15.897 13.3644 15.7835 13.3613 15.6669H13.0623C13.1236 15.7866 13.1804 15.9031 13.2325 16.0166C13.2847 16.1301 13.3337 16.236 13.3798 16.3341Z"
          fill="currentColor"
        />
      </svg>
    ),

    logout: ({ className, ...props }: SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-6 w-6 stroke-current", className)}
        {...props}
      >
        <path
          d="M8.9 7.56023C9.21 3.96023 11.06 2.49023 15.11 2.49023H15.24C19.71 2.49023 21.5 4.28023 21.5 8.75023V15.2702C21.5 19.7402 19.71 21.5302 15.24 21.5302H15.11C11.09 21.5302 9.24 20.0802 8.91 16.5402"
          stroke="#02915C"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 12H3.62"
          stroke="#02915C"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
          stroke="#02915C"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    "chevron-down": ({ className, ...props }: SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-6 w-6 fill-current", className)}
        {...props}
      >
        <path d="M12 16.8C11.3 16.8 10.6 16.53 10.07 16L3.55002 9.48C3.26002 9.19 3.26002 8.71 3.55002 8.42C3.84002 8.13 4.32002 8.13 4.61002 8.42L11.13 14.94C11.61 15.42 12.39 15.42 12.87 14.94L19.39 8.42C19.68 8.13 20.16 8.13 20.45 8.42C20.74 8.71 20.74 9.19 20.45 9.48L13.93 16C13.4 16.53 12.7 16.8 12 16.8Z" />
      </svg>
    ),
    "chevron-up": ({ className, ...props }: SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-6 w-6 fill-current", className)}
        {...props}
      >
        <path d="M12 7.2C11.3 7.2 10.6 7.47 10.07 8L3.55 14.52C3.26 14.81 3.26 15.29 3.55 15.58C3.84 15.87 4.32 15.87 4.61 15.58L11.13 9.06C11.61 8.58 12.39 8.58 12.87 9.06L19.39 15.58C19.68 15.87 20.16 15.87 20.45 15.58C20.74 15.29 20.74 14.81 20.45 14.52L13.93 8C13.4 7.47 12.7 7.2 12 7.2Z" />
      </svg>
    ),
    "arrow-up": ({ className, ...props }: SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-6 w-6 fill-current", className)}
        {...props}
      >
        <path
          d="M8.00016 2.6665V13.3332M8.00016 2.6665C7.12176 2.6665 4.66669 5.99971 4.66669 5.99971M8.00016 2.6665C8.87856 2.6665 11.3334 5.99977 11.3334 5.99977"
          stroke="#02915C"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    "arrow-down": ({ className, ...props }: SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-6 w-6 fill-current", className)}
        {...props}
      >
        <path
          d="M7.99987 13.3332V2.6665M7.99987 13.3332C8.87828 13.3332 11.3333 9.99996 11.3333 9.99996M7.99987 13.3332C7.12147 13.3332 4.66667 9.9999 4.66667 9.9999"
          stroke="#E01632"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),

    certificate: ({ className, ...props }: SVGProps<SVGSVGElement>) => (
      <svg
        width="82"
        height="71"
        viewBox="0 0 82 71"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-20 w-20", className)}
        {...props}
      >
        <path
          d="M10.9997 2.33334V7.00001C10.9997 8.10458 10.1042 9.00001 8.99967 9.00001H5.88634L4.46634 10.0667L3.39967 10.8667C3.28428 10.9532 3.14392 11 2.99967 11C2.89502 11.0019 2.79167 10.9766 2.69967 10.9267C2.47549 10.8137 2.33377 10.5844 2.33301 10.3333V9.00001C1.22844 9.00001 0.333008 8.10458 0.333008 7.00001V2.33334C0.333008 1.22877 1.22844 0.333344 2.33301 0.333344H8.99967C10.1042 0.333344 10.9997 1.22877 10.9997 2.33334Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.6669 5V9.66667C13.6669 10.7712 12.7715 11.6667 11.6669 11.6667V13C11.6661 13.251 11.5244 13.4804 11.3002 13.5933C11.2082 13.6432 11.1049 13.6685 11.0002 13.6667C10.856 13.6667 10.7156 13.6199 10.6002 13.5333L8.11355 11.6667H5.00022C4.60588 11.6649 4.22086 11.5466 3.89355 11.3267L6.10689 9.66667H9.00022C10.473 9.66667 11.6669 8.47276 11.6669 7V3C12.7715 3 13.6669 3.89543 13.6669 5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),

    calender: ({ className, ...props }: SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-6 w-6 fill-current", className)}
        {...props}
      >
        <path
          d="M8 2V5"
          stroke="#6B7280"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16 2V5"
          stroke="#9AA59D"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.5 9.08984H20.5"
          stroke="#9AA59D"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
          stroke="#9AA59D"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.6947 13.7002H15.7037"
          stroke="#9AA59D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.6947 16.7002H15.7037"
          stroke="#9AA59D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.9955 13.7002H12.0045"
          stroke="#9AA59D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.9955 16.7002H12.0045"
          stroke="#9AA59D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.29431 13.7002H8.30329"
          stroke="#9AA59D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.29431 16.7002H8.30329"
          stroke="#9AA59D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),

    // Add more outline icons here
  },

  //{* SOLID ICONS *}//
  solid: {
    dashboard: ({ className, ...props }: SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-6 w-6 fill-current", className)}
        {...props}
      >
        <path
          opacity="0.4"
          d="M20.83 8.01002L14.28 2.77002C13 1.75002 11 1.74002 9.73 2.76002L3.18 8.01002C2.24 8.76002 1.67 10.26 1.87 11.44L3.13 18.98C3.42 20.67 4.99 22 6.7 22H17.3C18.99 22 20.59 20.64 20.88 18.97L22.14 11.43C22.32 10.26 21.75 8.76002 20.83 8.01002Z"
          fill="#02915C"
        />
        <path
          d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18C12.75 18.41 12.41 18.75 12 18.75Z"
          fill="#02915C"
        />
      </svg>
    ),
    house: ({ className, ...props }: SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-8 w-8 fill-current", className)}
        {...props}
      >
        <path
          opacity="0.4"
          d="M7.25662 4.44287C7.05031 4.14258 6.75128 3.73499 7.36899 3.64205C8.00392 3.54651 8.66321 3.98114 9.30855 3.97221C9.89237 3.96413 10.1898 3.70519 10.5089 3.33548C10.8449 2.94617 11.3652 2 12 2C12.6348 2 13.1551 2.94617 13.4911 3.33548C13.8102 3.70519 14.1076 3.96413 14.6914 3.97221C15.3368 3.98114 15.9961 3.54651 16.631 3.64205C17.2487 3.73499 16.9497 4.14258 16.7434 4.44287L15.8105 5.80064C15.4115 6.38146 15.212 6.67187 14.7944 6.83594C14.3769 7 13.8373 7 12.7582 7H11.2418C10.1627 7 9.6231 7 9.20556 6.83594C8.78802 6.67187 8.5885 6.38146 8.18945 5.80064L7.25662 4.44287Z"
          fill="#02915C"
          stroke="#02915C"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
        <path
          d="M6.2875 9.23663C5.565 9.33663 5.06209 9.98996 5.06209 10.6833V13.29C5.06209 13.5033 5.23917 13.6633 5.45875 13.6633H7.54125C7.76792 13.6633 7.93792 13.4966 7.93792 13.29V10.5766C7.93792 9.7633 7.17292 9.10996 6.2875 9.22996V9.23663Z"
          fill="white"
        />
        <path
          d="M12.2446 4.20331L6.98167 0.483313C6.69125 0.283313 6.30875 0.283313 6.02542 0.483313L0.762501 4.20331C0.365834 4.48998 0.125 4.92998 0.125 5.40331V12.1633C0.125 12.99 0.840417 13.6633 1.71875 13.6633H3.46833C3.695 13.6633 3.865 13.4966 3.865 13.29V10.6433C3.865 9.45665 4.715 8.38331 5.9475 8.14331C7.64042 7.82331 9.135 9.03665 9.135 10.57V13.2833C9.135 13.4966 9.31208 13.6566 9.53167 13.6566H11.2812C12.1596 13.6566 12.875 12.9833 12.875 12.1566V5.39665C12.875 4.92331 12.6342 4.48331 12.2375 4.19665H12.2446V4.20331Z"
          fill="white"
        />
      </svg>
    ),
    ball: ({ className, ...props }: SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-5 w-5 fill-current", className)}
        {...props}
      >
        <circle cx="5" cy="5" r="5" fill="#D9D9D9" />
      </svg>
    ),
    car: ({ className, ...props }: SVGProps<SVGSVGElement>) => (
      <svg
        width="82"
        height="71"
        viewBox="0 0 82 71"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-20 w-20 fill-current", className)}
        {...props}
      >
        <path
          d="M68.1617 23.7097L61.6643 7.06599C61.4014 6.23263 60.6563 5.63402 59.7579 5.63402H22.2092C21.3437 5.63402 20.5877 6.23263 20.3028 7.06599L13.8274 23.7097H68.1617ZM74.7138 37.6421C74.7138 33.757 71.7774 30.6466 68.1507 30.6466C64.535 30.6466 61.5986 33.757 61.5986 37.6421C61.5986 41.5038 64.535 44.6611 68.1507 44.6611C71.7774 44.6611 74.7138 41.5038 74.7138 37.6421ZM13.3891 44.6611C17.0048 44.6611 19.9522 41.5038 19.9522 37.6421C19.9522 33.757 17.0048 30.6466 13.3891 30.6466C9.76243 30.6466 6.83699 33.757 6.83699 37.6421C6.83699 41.5038 9.76243 44.6611 13.3891 44.6611ZM19.4591 57.1029V64.0749C19.4591 67.9131 16.5556 71 13.0056 71C9.43373 71 6.55211 67.9131 6.55211 64.0749V57.1029H0V34.4613V34.4378C0 29.4846 3.10075 25.3295 7.33004 24.0971L14.8902 4.8124C16.0077 1.9954 18.5935 3.05176e-05 21.6176 3.05176e-05H60.3386C63.3846 3.05176e-05 65.9922 1.9954 67.0879 4.8124L74.6371 24.0971C78.8773 25.3295 82 29.4846 82 34.4378L81.9781 34.4613V57.1029H75.4041L75.4369 64.0749C75.4369 67.9131 72.5444 71 68.9834 71C65.4006 71 62.519 67.9131 62.519 64.0749L62.5409 57.1029H19.4591Z"
          fill="currentColor"
        />
      </svg>
    ),
    inbox: ({ className, ...props }: SVGProps<SVGSVGElement>) => (
      <svg
        width="82"
        height="71"
        viewBox="0 0 82 71"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-20 w-20 fill-current", className)}
        {...props}
      >
        <path
          d="M10.9997 2.33334V7.00001C10.9997 8.10458 10.1042 9.00001 8.99967 9.00001H5.88634L4.46634 10.0667L3.39967 10.8667C3.28428 10.9532 3.14392 11 2.99967 11C2.89502 11.0019 2.79167 10.9766 2.69967 10.9267C2.47549 10.8137 2.33377 10.5844 2.33301 10.3333V9.00001C1.22844 9.00001 0.333008 8.10458 0.333008 7.00001V2.33334C0.333008 1.22877 1.22844 0.333344 2.33301 0.333344H8.99967C10.1042 0.333344 10.9997 1.22877 10.9997 2.33334Z"
          fill="currentColor"
        />
        <path
          d="M13.6669 5V9.66667C13.6669 10.7712 12.7715 11.6667 11.6669 11.6667V13C11.6661 13.251 11.5244 13.4804 11.3002 13.5933C11.2082 13.6432 11.1049 13.6685 11.0002 13.6667C10.856 13.6667 10.7156 13.6199 10.6002 13.5333L8.11355 11.6667H5.00022C4.60588 11.6649 4.22086 11.5466 3.89355 11.3267L6.10689 9.66667H9.00022C10.473 9.66667 11.6669 8.47276 11.6669 7V3C12.7715 3 13.6669 3.89543 13.6669 5Z"
          fill="currentColor"
        />
      </svg>
    ),
    certificate: ({ className, ...props }: SVGProps<SVGSVGElement>) => (
      <svg
        width="82"
        height="71"
        viewBox="0 0 82 71"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-20 w-20 fill-current", className)}
        {...props}
      >
        <path
          d="M2.33333 0.166656C1.32081 0.166656 0.5 0.987468 0.5 1.99999V9.99999C0.5 11.0125 1.32081 11.8333 2.33333 11.8333H11.6666C12.6791 11.8333 13.5 11.0125 13.5 9.99999V3.99999C13.5 3.1444 12.9139 2.42571 12.1213 2.22347C11.9167 1.23911 11.0444 0.499439 9.99941 0.499439H4.54983C4.24263 0.283792 3.87508 0.166656 3.49651 0.166656H2.33333ZM9.99941 1.49944C10.4651 1.49944 10.8671 1.77219 11.0544 2.16666H6.77411C6.57132 2.16666 6.37548 2.09271 6.22331 1.95867L5.70193 1.49944H9.99941Z"
          fill="white"
        />
      </svg>
    ),

    support: ({ className, ...props }: SVGProps<SVGSVGElement>) => (
      <svg
        width="82"
        height="71"
        viewBox="0 0 82 71"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-20 w-20 fill-current", className)}
        {...props}
      >
        <path
          d="M13.5463 3.18C13.1489 1.71187 12.0099 0.560202 10.5463 0.146662C9.31583 -0.1906 7.9983 0.0793454 6.99962 0.873329C6.00094 0.0793454 4.68341 -0.1906 3.45295 0.146662C1.98931 0.560202 0.850295 1.71187 0.452953 3.18C0.111028 4.58606 0.578542 6.06567 1.66629 7.01999L6.55295 11.8067C6.81218 12.0608 7.22706 12.0608 7.48629 11.8067L12.333 7.01999C13.4207 6.06567 13.8882 4.58606 13.5463 3.18Z"
          fill="white"
        />
      </svg>
    ),

    // Add more solid icons here
  },
};

// Main Icon component
const Icon = ({
  name,
  variant = "outline",
  className,
  strokeWidth = 1.5,
}: IconProps) => {
  const IconComponent =
    icons[variant][name as keyof (typeof icons)[typeof variant]];

  if (!IconComponent) return null;

  return <IconComponent className={className} strokeWidth={strokeWidth} />;
};

export { Icon };
