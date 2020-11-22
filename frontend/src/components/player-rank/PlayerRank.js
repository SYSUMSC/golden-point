import './PlayerRank.scss';
import React from 'react';

export function PlayerRank({ data }) {
  return (
    <div className="playerRankContainer">
      <h3 className="title">当前排名</h3>
      {!data && <p className="noData">暂无数据，请稍等</p>}
      {data && (
        <div className="rankItemContainer">
          {data.map((item, index) => (
            <React.Fragment key={`${item.id}`}>
              <div className="rankItem">
                <code className={`rank ${index <= 9 ? 'rank--bold' : ''}`}>#{index + 1}</code>
                <span className="name">{item.name}</span>
                <code className="score">
                  ({item.score > 0 ? `+${item.score}` : `${item.score}`}) {item.totalScore}pt
                </code>
              </div>
              {index !== data.length - 1 && <div className="split" />}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
