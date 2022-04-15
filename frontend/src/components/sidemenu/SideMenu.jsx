import React from "react";
import classes from "./SideMenu.module.css"
import { slide as Menu } from "react-burger-menu";
import {
    FaPaperclip,
    FaTint,
    FaAtom,
    FaHouseUser,
    FaChevronLeft,
    FaChevronDown
} from 'react-icons/fa';
import styles from './MenuStyles';


class Dropdown extends React.Component {

    state = {
        isOpen: false,
    }

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({ isOpen: this.state.isOpen ? false : true });

    }

    render() {
        return (
            <div className={classes.dropdown}
                onClick={this.handleClick}>
                <div className={classes.dropdownItem}>
                    {this.props.icon}
                    {this.props.title}
                    {this.state.isOpen ? <FaChevronDown /> : <FaChevronLeft />}
                </div>
                <div className={classes.dropdownContent + `${this.state.isOpen ? 'active' : ''}`}>
                    <div className={classes.dropdownContentList}>
                        {this.props.items.map((item, key) => (
                            <a href={item.href} className={classes.dropdownContentLink} key={key}>
                                <div className={classes.dropdownItem}>
                                    {this.props.icon}{item.label}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}


export default class SideMenu extends React.Component {

    render() {
        return (
            <div>
                <Menu  styles={styles}>
                    <a href="/" className={classes.menuItem}>
                        <div className={classes.menuLabel}> <FaHouseUser /> Главная</div>
                    </a>
                    <a href="/boils" className={classes.menuItem}>
                        <div className={classes.menuLabel}> <FaAtom />Варки</div>
                    </a>
                    <Dropdown
                        icon={<FaTint />}
                        title={"Сырье"}
                        items={[
                            { 'href': '/products', 'label': 'Сырье' },
                            { 'href': '/lots', 'label': 'Квазипартии' },
                            { 'href': '/trademarks', 'label': 'Торговые названия' },
                        ]}
                    />
                    <Dropdown
                        icon={<FaPaperclip />}
                        title={"Отчеты"}
                        items={[
                            { 'href': '/report_boil_summary', 'label': 'Сходимость варок' },
                        ]}
                    />
                </Menu>
            </div>
        )
    }
};