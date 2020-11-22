import './GraphView.scss';
import React, { useEffect, useState, useRef } from 'react';
import seed from 'seed-random';

function Dot({ isGold, name, value, degree, radius }) {
  const pointRef = useRef(null);
  const [position, setPosition] = useState([0, 0]);
  useEffect(() => {
    if (!isGold) {
      const distanceToG = value / radius;
      const relativeX = (Math.cos(degree) * distanceToG * 100) / 2;
      const relativeY = (Math.sin(degree) * distanceToG * 100) / 2;
      setPosition([50 + relativeX, 50 + relativeY]);
    }
  }, [isGold, value, radius, degree]);
  useEffect(() => {
    if (!isGold) {
      pointRef.current.style.top = position[0] + '%';
      pointRef.current.style.left = position[1] + '%';
    }
  }, [isGold, position]);
  return (
    <div ref={pointRef} className={`point ${isGold ? 'point--gold' : ''}`}>
      <div className="dot" />
      <span className="dotCaption">
        {name} ({value})
      </span>
    </div>
  );
}

export function GraphView({ data, isWaiting }) {
  const [radius, setRadius] = useState(100);
  const [pointDegrees, setPointDegrees] = useState([]);
  useEffect(() => {
    if (data) {
      seed(JSON.stringify(data), { global: true });
      setRadius(5 + data.scoreMap[data.scoreMap.length - 1].deltaWithG);
      setPointDegrees(data.scoreMap.map(() => Math.floor(Math.random() * 360)));
    }
  }, [data, isWaiting]);
  return (
    <div className="graphViewContainer">
      <h1 className="status">{!data ? '等待数据' : isWaiting ? '等待新一轮游戏' : '最新结果'}</h1>
      {data && (
        <>
          <Dot isGold={true} name="黄金点" value={data.goldPoint.toPrecision(2)} />
          {data.scoreMap.map((item, index) => (
            <Dot
              key={item.id}
              isGold={false}
              name={item.name}
              value={item.deltaWithG.toPrecision(2)}
              degree={pointDegrees[index]}
              radius={radius}
            />
          ))}
        </>
      )}
    </div>
  );
}
