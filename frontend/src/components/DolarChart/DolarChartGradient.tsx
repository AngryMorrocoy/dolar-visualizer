import { FunctionComponent } from 'react';

const DolarChartGradient: FunctionComponent<any> = ({ id }): JSX.Element => {
  return (
    <linearGradient
      id={id}
      x1="50%"
      y1="0%"
      x2="50%"
      y2="100%"
    >
      <stop offset="5%" stopColor="rgb(0, 75, 168)" stopOpacity={1} />
      <stop offset="95%" stopColor="rgb(0, 75, 168)" stopOpacity={0.3} />
    </linearGradient>
  );
};

export default DolarChartGradient;
