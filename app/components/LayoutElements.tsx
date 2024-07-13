import { Link } from '@remix-run/react';
import { RiScissorsFill } from '@remixicon/react';
import { stdSpace } from '~/settings';

export const Header = () => {
  return (
		<div className={`flex justify-around items-center my-${stdSpace}`}>
      <div className="inline-flex justify-start grow">
        <RiScissorsFill size={12} className="transform rotate-0" />
      </div>
      {/* <div><Link to="/insert">Insert</Link></div> */}
			<div className="mx-5">
				<Link to="/">
          <h1 className="m-0 text-3xl">sniPPPool</h1>
        </Link>
			</div>
      {/* <div><Link to="#!" className="text-gray-500">Update</Link></div> */}
      <div className="inline-flex justify-end grow">
        <RiScissorsFill size={12} className="transform -rotate-180"/>
      </div>
		</div>
	);
};

export const Footer = () => {
  return (<div className="w-full self-end">
    <div className="w-full border-t text-center bg-gray-700">...</div>
  </div>);
};
