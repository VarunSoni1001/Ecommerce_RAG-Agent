import React from "react";

const Color = (props) => {
  const { colorData, setColor, selectedColorId } = props;
  console.log("colorData", colorData);
  console.log("selectedColorId", selectedColorId);
  return (
    <>
      <ul className="colors ps-0">
        {colorData &&
          colorData?.map((item, index) => {
            return (
              <li
                onClick={() => setColor(item?._id)}
                style={{
                  backgroundColor: item?.title,
                  padding: "2px",
                  outline:
                    selectedColorId === item?._id
                      ? "4px solid #000fff32"
                      : "4px solid transparent",
                }}
                key={index}
              />
            );
          })}
      </ul>
    </>
  );
};

export default Color;
