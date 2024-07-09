import { RiScissorsFill } from '@remixicon/react';
import { stdSpace } from '~/settings';

export const Header = () => {
  return (
		<div className={`flex flex-row items-center mb-${stdSpace}`}>
      <div><RiScissorsFill size={12} className="transform rotate-0" /></div>
			<div className="mx-auto">
				<h1 className="m-0">sniPPPool</h1>
			</div>
      <div><RiScissorsFill size={12} className="transform -rotate-180"/></div>
		</div>
	);
};

export const Footer = () => {
  return <>...</>;
};
