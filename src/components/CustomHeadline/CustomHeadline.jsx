const CustomHeadline = ({title, className}) => {
     return (
          <div className=" p-3">
               <h1
                    className={`${className} bg-main text-center text-2xl w-full md:max-w-[50%] mx-auto my-20 p-2`}>
                    {title}
               </h1>
          </div>
     );
};

export default CustomHeadline;
