import React, { useState, useEffect } from "react";

const App = (props) => {
  const [customer, setCustomer] = useState([]);

  const callApi = async () => {
    // proxy에 설정한 주소에 fetch 인자의 주소를 덧붙여서 정보를 받아옵니다.
    const res = await fetch(`/api/customers`);
    const body = await res.json();
    setCustomer(body);
  };

  useEffect(() => {
    callApi();
  });

  return (
    <div>
      {customer.map((c) => {
        return (
          <div>
            {c.id}
            {c.id}
            {c.image}
            {c.name}
            {c.birthday}
            {c.gender}
            {c.job}
          </div>
        );
      })}
    </div>
  );
};
export default App;
