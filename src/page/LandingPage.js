import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Navbar,
  Home,
  Fitur,
  Testimoni,
  Footer,
} from "../components/landingPage";
import { handleActivatedNavItem } from "../redux/reducers/navbarSlice";

const LandingPage = () => {

  const dispatch = useDispatch();

  const onScroll = () => {
    dispatch(handleActivatedNavItem(window.scrollY));
  }
 
  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  })

  return (
    <div>
      <Navbar />
      <Home />
      <Fitur />
      <Testimoni />
      {/* <Hargaa /> */}
      <Footer />
    </div>
  );
};

export default LandingPage;