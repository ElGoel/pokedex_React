import React from 'react';

const Card = React.forwardRef(({ img, number, name, types }, ref) => {

  const renderTypes = types.map((type) => (
    <p key={type.slot} className={`type-${type.type.name}`}>
      {type.type.name}
    </p>
  ));

  const nameCamelCase = name.charAt(0).toUpperCase() + name.slice(1);

  const postBody = (
    <>
      <div className="card--image">
        <img className="card--image__img" src={img} alt="imagen pokemon" />
      </div>
      <div className="card--info">
        <h3>{`N.°${number}`}</h3>
        <h1>{nameCamelCase.replace(/[-]/g, " ")}</h1>
        <dir className="card--types">{renderTypes}</dir>
      </div>
    </>
  );

  const content = ref // ref determinar la ultima carta
    ? <div ref={ref} className="card">{postBody}</div>
    : <div className="card">{postBody}</div>

  return content;
});

export default Card