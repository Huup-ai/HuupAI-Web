import React from 'react';

const Header = ({ category, title, des }) => (
  <div className=" mb-10">
    <p className="text-lg text-gray-400">{category}</p>
    <p className="text-3xl font-extrabold tracking-tight text-slate-900">
      {title}
    </p>
    <p className="text-lg text-slate-900">{des}</p>
  </div>
);

export default Header;