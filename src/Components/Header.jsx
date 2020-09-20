import React, { useState, useEffect } from 'react';
import HeaderSearch from './HeaderSearch';
import { Link } from 'react-router-dom';
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react';

const Header = props => {
    const [namedBeaches, setNamedBeaches] = useState([]);
    // { name: "", latitude: null, longitude: null }

    const getNamedBeaches = async () => {
        const response = await fetch('http://localhost:3000/api/v1/beaches');
        let data = await response.json();
        setNamedBeaches(data);
    }

    useEffect(() => {
        getNamedBeaches();
    }, []);

    const parseUSANamedBeaches = () => {
        return namedBeaches.map(namedBeach => renderDropdownItem(namedBeach))
    }

    const renderDropdownItem = (beachObj) => {
        let urlPrefix = beachObj.name.replace(/\s+/g, '-').toLowerCase();
        return (<Dropdown.Item key={beachObj.id} as={Link} to={`/${urlPrefix}-surf-report`}>{beachObj.name}, NY</Dropdown.Item>)
    }

    console.log("Header Render ", namedBeaches)
    return (
        <Container>
            <Menu fixed='top' stackable inverted>
            <Menu.Item as='a' header>
                <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
                Sea State
            </Menu.Item>
            <Menu.Item as={Link} to='/home'>Home</Menu.Item>
            <Dropdown item simple text='Forecasts'>
            <Dropdown.Menu>
                <Dropdown.Item>Placeholder List Items</Dropdown.Item>
                <Dropdown.Item>Favorites</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Regions</Dropdown.Header>
                <Dropdown.Item>
                    <i className='dropdown icon' />
                    <span className='text'>USA</span>
                    <Dropdown.Menu>
                        {parseUSANamedBeaches()}
                    </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>
                    <i className='dropdown icon' />
                    <span className='text'>Canada</span>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to='/tofino-surf-report'>Tofino, BC</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown.Item>
                {/* <Dropdown.Item>Placeholder List Item</Dropdown.Item> */}
            </Dropdown.Menu>
            </Dropdown>     
            <Menu.Item as={Link} to='/login'>Sign-in</Menu.Item>
            <Menu.Item> <HeaderSearch /> </Menu.Item>
            </Menu>
        </Container>
    );
}

export default Header;