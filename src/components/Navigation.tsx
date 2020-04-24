import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { HamburgerMenu, Logo } from '../assets/svg';

export const NavigationBar: React.FC = () => {
  const [mobileView, setMobileView] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  // setMobileView based on window size...
  useEffect(() => {
    if (typeof window === 'undefined') return; // fix for SSR
    const handleResize = () => setMobileView(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenuClick = () => {
    setShowMenu(prevState => !prevState);
  };

  return (
    <>
      {mobileView && showMenu && (
        <>
          <CancelMenu onClick={handleMenuClick} />
          <FloatingMenu>
            <MenuLink to={'/articles'}>Articles</MenuLink>
            <MenuLink to={'/contact'}>Contact</MenuLink>
            <MenuLink to={'/cv'}>CV</MenuLink>
          </FloatingMenu>
        </>
      )}
      <BarContainer>
        <NavigationItems>
          <LogoContainer to={'/'}>
            <Logo />
          </LogoContainer>
          {mobileView ? (
            <MenuButton onClick={handleMenuClick}>
              <HamburgerMenu />
            </MenuButton>
          ) : (
            <>
              <Spacer />
              <NavLink to={'/articles'}>Articles</NavLink>
              <NavLink to={'/contact'}>Contact</NavLink>
              <NavLink to={'/cv'}>CV</NavLink>
            </>
          )}
        </NavigationItems>
      </BarContainer>
    </>
  );
};

// styles

const BarContainer = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  z-index: 100;
  background-color: ${({ theme }) => theme.background}AA;
  top: 0;
  left: 0;
`;

const NavigationItems = styled.div`
  width: 95%;
  height: 100%;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2%;
  padding-right: 2%;
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 1rem;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: -0.03rem;
  font-weight: 300;
  font-size: 1.6rem;
  text-decoration: none;
  text-transform: uppercase;
  :link,
  :visited,
  :active {
    color: ${({ theme }) => theme.highlight};
  }
  :hover {
    color: ${({ theme }) => theme.brightBlue};
  }
  @media (min-width: 980px) {
    font-size: 1.8rem;
  }
`;

const LogoContainer = styled(Link)`
  width: 40px;
  height: 40px;
  fill: ${({ theme }) => theme.highlight};
  stroke: ${({ theme }) => theme.highlight};
  :hover {
    fill: ${({ theme }) => theme.brightBlue};
    stroke: ${({ theme }) => theme.brightBlue};
  }
`;

const Spacer = styled.div`
  width: 10%;
`;

const FloatingMenu = styled.div`
  position: fixed;
  z-index: 100;
  top: 50px;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.background}AA;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const MenuButton = styled.div`
  z-index: 100;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MenuLink = styled(NavLink)`
  padding: 3rem 0;
`;

const CancelMenu = styled.div`
  position: fixed;
  z-index: 50;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;
