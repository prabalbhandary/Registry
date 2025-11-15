import { useState } from "react";
import { PulseLoader } from "./UniversalComponent/UniversalLoader";

function Loader({children}) {
  const [loading, setLoading] = useState(true);
  
  if (loading) {
    return <PulseLoader />;
  }
  
  return <div>{children}</div>;
}

export default Loader;