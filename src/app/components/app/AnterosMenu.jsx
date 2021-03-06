import React, { Component } from 'react';
import AnterosMenuItem from './AnterosMenuItem';
import lodash from 'lodash';


export default class AnterosMenu extends Component {

  constructor(props) {
    super(props);
    this.state = { activeId: undefined, expandedIds: [] };
    this.setActiveId = this.setActiveId.bind(this);
    this.getActiveId = this.getActiveId.bind(this);
    this.onExpandId = this.onExpandId.bind(this);
    this.onCollapseId = this.onCollapseId.bind(this);
    this.isExpanded = this.isExpanded.bind(this);
  }

  setActiveId(id) {
    this.setState({ activeId: id });
  }

  getActiveId() {
    return this.state.activeId;
  }

  onExpandId(id) {
    let ids = this.state.expandedIds;
    ids = ids.concat(id);
    this.setState({ ...this.state, expandedIds: ids });
  }

  isExpanded(id) {
    return (this.state.expandedIds.indexOf(id) !== -1);
  }

  onCollapseId(id) {
    let ids = this.state.expandedIds;
    const index = ids.indexOf(id);
    if (index !== -1) {
      ids.splice(index, 1);
    }
    this.setState({ ...this.state, expandedIds: ids });
  }

  getChildContext() {
    let orientation = this.props.orientation;

    if (this.props.horizontal) {
      orientation = 'horizontal';
    }

    if (this.props.vertical) {
      orientation = 'vertical';
    }


    if (!orientation){
      this.orientation = this.context.orientation;
      if (this.context.horizontal) {
        orientation = 'horizontal';
      }
  
      if (this.context.vertical) {
        orientation = 'vertical';
      }
    }

    return { orientation };
  }

  render() {
    let children = [];
    if (this.props.children) {
      let _this = this;
      let arrChildren = React.Children.toArray(this.props.children);
      arrChildren.forEach(function (child) {
        if (child.props.visible) {
          children.push(React.createElement(AnterosMenuItem, {
            key: child.props.id,
            icon: child.props.icon,
            caption: child.props.caption,
            route: child.props.route,
            id: child.props.id,
            onSelectMenuItem: child.props.onSelectMenuItem,
            getActiveId: _this.getActiveId,
            setActiveId: _this.setActiveId,
            onExpandId: _this.onExpandId,
            onCollapseId: _this.onCollapseId,
            isExpanded: _this.isExpanded,
            active: child.props.active,
            level: 1
          },
            child.props.children
          ))
        };
      });
    }

    let orientation = this.props.orientation;

    if (this.props.horizontal) {
      orientation = 'horizontal';
    }

    if (this.props.vertical) {
      orientation = 'vertical';
    }

    if (!orientation){
      this.orientation = this.context.orientation;
      if (this.context.horizontal) {
        orientation = 'horizontal';
      }
  
      if (this.context.vertical) {
        orientation = 'vertical';
      }
    }

    if (orientation == 'horizontal') {
      return (<div className="horizontal-fixed">
        <div className="main-menu" id="horizontal-fixed">
          <div className="main-menu-content" style={{ width: "auto" }}>
            <ul className="main-navigation">
              {children}
            </ul>
          </div>
        </div>
      </div>);
    } else {
      return (
        <aside className="sidebar">
          <div className="sidebar-container">
            <div className="sidebar-header">
              <div className="brand hidden-md-up">
                <img src={this.props.logo} />
              </div>
            </div>
            <nav className="menu">
              <ul className="nav flex-column" id="sidebar-menu">
                {children}
              </ul>
            </nav>
          </div>
          <footer className="sidebar-footer">
            <ul className="nav " id="customize-menu">
            </ul>
          </footer>
        </aside>
      );
    }
  }
}


AnterosMenu.contextTypes = {
  horizontal: React.PropTypes.bool,
  orientation: React.PropTypes.oneOf(['horizontal', 'vertical'])
}

AnterosMenu.childContextTypes = {
  horizontal: React.PropTypes.bool,
  orientation: React.PropTypes.oneOf(['horizontal', 'vertical'])
}

AnterosMenu.propTypes = {
  horizontal: React.PropTypes.bool,
  vertical: React.PropTypes.bool,
  orientation: React.PropTypes.oneOf(['horizontal', 'vertical'])
}

AnterosMenu.defaultProps = {

}

