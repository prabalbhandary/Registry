import { useState } from "react";
import { GlowingLoader } from "./UniversalComponent/UniversalLoader";

function Loader({children}) {
  const [loading, setLoading] = useState(true);
  
  if (loading) {
    return <GlowingLoader />;
  }
  
  return <div>{children}</div>;
}

export default Loader;