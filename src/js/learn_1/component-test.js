/**
 * description
 * 状态驱动
 */
var Tab = React.createClass({//{{{
    getInitialState: function () {
        return {
            title:this.props.title,
            body:this.props.body
        }
    },
    setCurrent: function (index) {
        this.setState({"title":this.update(this.props.title,index)})
        this.setState({"body":this.update(this.props.body,index)})
    },
    update: function (param,index) {
        if(!param) return;
        _.forEach(param,function(n,key) {
            if(key == index) {
                n.active = true;
            } else {
                n.active = false;

            }
        })
    },
    onHandleClick : function (index) {
        this.setCurrent(index)
        console.log(1)
    },
    render: function () {
        return (
            <div>
                <TabHeader title={this.props.title} onHandleClick={this.onHandleClick}/>
                <TabBody body={this.props.body}/>
            </div>
        )
    }
})//}}}
var TabHeader = React.createClass({//{{{
    handleClick: function (index) {
        this.props.onHandleClick(index)
    },
    render: function () {
        var _this = this;
        return (
            <ul className="mui-tabs__bar mui-panel tab-header"> {
                this.props.title.map(function(item,index) {

                    var isStatus = item.active ? "mui--is-active" : "";

                    return <li className={isStatus}
                    onClick={_this.handleClick.bind(this,index)}
                            key={index}>
                            <a href="#">{item.name}</a>
                        </li>

                },this)
            }
            </ul>
        )
    }
})//}}}
var TabBody = React.createClass({//{{{
    render: function () {
        console.log(this.props.body)

        return (
            <div className="tab-body"> {

                this.props.body.map(function (item,index) {
                    var isStatus = item.active ? "mui--is-active" : "";
                    return <div className={'mui-tabs__pane mui-panel '+isStatus}  key={index}>{item.name}</div>

                })
            }
            </div>
        )
    }
})//}}}

var mountNode = document.getElementById("render");
var tabMount = document.getElementById("tab");

var props = {
    title:[{name:"tab1",active:true},{name:"tab2"}],
    body:[{name:"content1",active:true},{name:"content2"}]
}
React.render(
    <Tab {...props} />,
    tabMount
)
