import React, { Component } from 'react';
import lodash from 'lodash';
import { AnterosError } from "anteros-react";


export default class AnterosMenuItem extends Component {

    constructor(props, context) {
        super(props);
        this.toggleExpanded = this.toggleExpanded.bind(this);
        if (!(this.props.id)) {
            throw new AnterosError('Informe um ID para o component AnterosMenuItem.');
        }
    }

    toggleExpanded(event) {
        let expanded = !this.props.isExpanded(this.props.id);
        if (expanded) {
            this.props.onExpandId(this.props.id)
        } else {
            this.props.onCollapseId(this.props.id);
        }

        this.props.setActiveId(this.props.id);

        if (this.props.onSelectMenuItem) {
            this.props.onSelectMenuItem(this);
        }
        event.stopPropagation();
    }

    render() {
        let newChildren = [];
        if (this.props.children) {
            let _this = this;
            let arrChildren = React.Children.toArray(this.props.children);
            arrChildren.forEach(function (child) {
                if (child.type && child.type.name == "AnterosMenuItem") {
                    if (child.props.visible) {
                        newChildren.push(React.createElement(AnterosMenuItem, {
                            key: child.props.id,
                            icon: child.props.icon,
                            iconColor: child.props.iconColor,
                            route: child.props.route,
                            id: child.props.id,
                            caption: child.props.caption,
                            onSelectMenuItem: child.props.onSelectMenuItem,
                            getActiveId: _this.props.getActiveId,
                            setActiveId: _this.props.setActiveId,
                            onExpandId: _this.props.onExpandId,
                            onCollapseId: _this.props.onCollapseId,
                            isExpanded: _this.props.isExpanded,
                            level: _this.props.level + 1
                        },
                            child.props.children
                        ));
                    }
                } else {
                    newChildren.push(child);
                }
            });
        }

        let classItem;
        if (this.props.getActiveId() == this.props.id) {
            classItem = "active";
        }

        let icon;
        if (this.props.icon) {
            icon = (<i style={{ color: this.props.iconColor }} className={this.props.icon}></i>);
        }

        let arrowIcon;
        let children;

        if (this.context.orientation == 'vertical') {
            if (newChildren && newChildren.length > 0) {
                arrowIcon = (<i className="fa arrow" style={{ float: "right", marginRight: "5px" }} />);
                if (this.props.isExpanded(this.props.id)) {
                    classItem = "open";
                    children = (<ul>{newChildren}</ul>);
                }
            }
            return (
                <li className={classItem} onClick={this.toggleExpanded} id={this.props.id}>
                    <a href={this.props.href} style={{ paddingLeft: (((this.props.level - 1) * 10) + 10) + "px" }}>
                        {icon}<img src={this.props.image} /> {this.props.caption} {arrowIcon}
                    </a>
                    {children}
                </li>
            )
        } else {
            if (newChildren && newChildren.length > 0) {
                if (this.props.level == 1) {
                    return (<li className={"nav-item "+(this.props.getActiveId() == this.props.id?"has-class":"")}>
                        <a>
                            {icon}<img src={this.props.image} />
                            <span>{this.props.caption}</span>
                        </a>
                        <ul className={"tree-" + this.props.level + " open"}>
                            {newChildren}
                        </ul>
                    </li>);
                } else {
                    let className = "nav-sub-item";
                    if (this.props.level>=3){
                        className += "-"+this.props.level;
                    }
                    return (<li className={className+(this.props.getActiveId() == this.props.id?" has-class":"")}>
                        <a>
                            {icon}<img src={this.props.image} />
                            <span>{this.props.caption}</span>
                        </a>
                        <ul className={"tree-" + this.props.level + " open"}>
                            {newChildren}
                        </ul>
                    </li>);
                }
            } else {
                return (<li>
                    <a>
                        <span>  {icon}<img src={this.props.image} /></span>
                        {this.props.caption}
                    </a>
                </li>);
            }
        }


    }
}


AnterosMenuItem.propTypes = {
    active: React.PropTypes.bool,
    icon: React.PropTypes.string,
    iconColor: React.PropTypes.string,
    image: React.PropTypes.string,
    caption: React.PropTypes.string,
    onSelectMenuItem: React.PropTypes.func,
    href: React.PropTypes.string,
    visible: React.PropTypes.bool,
    divider: React.PropTypes.bool
};

AnterosMenuItem.defaultProps = {
    active: false,
    icon: undefined,
    image: undefined,
    caption: undefined,
    href: undefined,
    visible: true,
    divider: false
};

AnterosMenuItem.contextTypes = {
    orientation: React.PropTypes.oneOf(['horizontal', 'vertical'])
};
