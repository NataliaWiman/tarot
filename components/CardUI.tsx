import { TarotCard } from "@/types";
import Image from "next/image";

interface CardUIProps {
  card: TarotCard | undefined;
  isLarge?: boolean;
}

const CardUI = ({ card, isLarge }: CardUIProps) => {
  const renderImage = (src: string, styles = "") => (
    <Image
      src={src}
      alt="minor suit"
      width="20"
      height="20"
      className={`mx-auto px-1 ${styles}`}
    />
  );

  const isMajorArcana = card?.suit === "Major Arcana";
  const isMinorArcanaAndNotOne =
    card?.suit !== "Major Arcana" && card?.number !== 1;
  const isMinorArcanaAndOne =
    card?.suit !== "Major Arcana" && card?.number === 1;

  return (
    <div
      className={`flex flex-col justify-center md:gap-2 gap-${
        isLarge ? "4" : "2"
      } cursor-pointer`}
    >
      <div
        className={`relative flex flex-col gap-2 justify-center items-center aspect-[2/3] bg-rose-50 rounded-2xl shadow-md`}
      >
        {isMajorArcana &&
          renderImage(`/img/major/${card?.number}.svg`, "w-full")}

        {isMinorArcanaAndNotOne && (
          <>
            {renderImage(
              `/img/minor/${card?.suit}.svg`,
              "absolute top-[4%] left-[4%] md:top-3 md:left-3 w-[38%]"
            )}
            {renderImage(
              `/img/minor/${card?.suit}.svg`,
              "absolute bottom-[4%] right-[4%] md:bottom-3 md:right-3 w-[38%]"
            )}
          </>
        )}

        {isMinorArcanaAndOne &&
          renderImage(`/img/minor/${card?.suit}.svg`, "w-[70%]")}

        {isMinorArcanaAndNotOne &&
          (card && card?.number <= 10 ? (
            <span
              className={`px-2 mx-auto text-${
                isLarge ? "9xl" : "3xl"
              } md:text-3xl text-orange-300 font-bold rounded-xl`}
            >
              {card?.number}
            </span>
          ) : (
            renderImage(`/img/minor/${card?.number}.svg`, "w-[70%]")
          ))}
      </div>

      <div className="flex items-center justify-center">
        <span
          className={`font-semibold md:text-xs text-${
            isLarge ? "xl" : "xs"
          } text-center leading-none text-stone-700`}
        >
          {card?.name}
        </span>
      </div>
    </div>
  );
};

export default CardUI;
