export default function EyeIconInverse({ showPassword, setShowPassword }) {
    return (
      <div className=" mt-5">
        {showPassword ? (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 stroke-secondary-1"
            onClick={() => setShowPassword(!showPassword)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              height={23}
              width={23}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M4 10C4 10 5.6 15 12 15M12 15C18.4 15 20 10 20 10M12 15V18M18 17L16 14.5M6 17L8 14.5"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
        ) : (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 stroke-secondary-1"
            onClick={() => setShowPassword(!showPassword)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              height={23}
              width={23}
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M4 12C4 12 5.6 7 12 7M12 7C18.4 7 20 12 20 12M12 7V4M18 5L16 7.5M6 5L8 7.5M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
        )}
      </div>
    );
  }