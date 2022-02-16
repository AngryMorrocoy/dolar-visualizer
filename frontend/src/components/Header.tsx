import { FunctionComponent } from 'react';
import { Typography, Layout } from 'antd';

const { Title } = Typography;
const { Header: _Header } = Layout;

const Header: FunctionComponent<any> = (): JSX.Element => {
  return (
    <_Header>
      <Title>Dolar en Tiempo</Title>
    </_Header>
  );
};

export default Header;
