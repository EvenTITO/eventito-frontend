import React from 'react';
import PropTypes from 'prop-types';

export default function HeaderContainer({ children, showBorder, headerColor }) {
	var headerColor = headerColor ? headerColor : 'white';
	return (
		<div className="flex w-full flex-col">
			<header
				className={`sticky top-0 flex h-16 items-center gap-4 px-4 md:px-6 ${showBorder ? 'border-b' : ''}`}
				style={{ backgroundColor: headerColor }}
			>
				{children}
			</header>
		</div>
	);
}

HeaderContainer.propTypes = {
	children: PropTypes.node.isRequired,
	showBorder: PropTypes.bool,
	headerColor: PropTypes.string,
};

HeaderContainer.defaultProps = {
	showBorder: false,
	headerColor: 'transparent',
};
