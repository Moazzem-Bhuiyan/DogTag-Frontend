import Image from "next/image";
import Card1 from "/public/card1.png";
import Card2 from "/public/card2.png";
import Card3 from "/public/card3.png";

const HomeCard = () => {
     const card = [
          {
               img: Card1,
               title: "GET INSPIRED",
               description:
                    "Choose the item you’d like to personalize, then add your custom details  whether it’s text, a design, Or a special message. Make it truly yours!",
          },
          {
               img: Card2,
               title: "BE CREATIVE",
               description:
                    "Once you're happy with your customization, simply click Add to Cart to save your personalized item and proceed with your order.",
          },
          {
               img: Card3,
               title: "CHECKOUT",
               description:
                    "Complete your purchase. We’ll take care of the rest and get your custom creation to you as quickly as possible!",
          },
     ];

     return (
          <div className=" font-serif">
               <div className=" w-full md:max-w-[50%] mx-auto md:space-y-5 mt-10">
                    <h1 className=" text-xl md:text-3xl font-bold">
                         Custom Creations as Unique as You Are!
                    </h1>

                    <p className=" p-10 text-center">
                         At United Tags, we specialize in custom military dog
                         tags and laser-engraved items, offering a personal
                         touch for your everyday essentials or special gifts.
                         Whether youre looking to personalize a military dog tag
                         with names, dates, or unique designs, or want to add a
                         custom engraving to jewelry, keychains, or other
                         keepsakes, we ve got you covered. Our high-quality
                         craftsmanship ensures that each item is made with
                         precision and care. Browse our store today and create
                         something truly one-of-a-kind!
                    </p>
               </div>

               <div className=" grid xl:grid-cols-3 lg:grid-cols-2 gap-10 justify-center items-center w-full max-w-[80%]  mx-auto mt-20 ">
                    {card.map((card, index) => (
                         <div
                              className=" bg-main p-12 px-12 space-y-5 rounded-md max-w-sm mx-auto  shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-white h-[300px] "
                              key={index}>
                              <div className=" flex justify-center items-center ">
                                   <Image src={card?.img} alt="cardImg" />
                              </div>
                              <h1 className=" text-center">
                                   {index + 1}. {card.title}
                              </h1>
                              <p>{card.description}</p>
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default HomeCard;
