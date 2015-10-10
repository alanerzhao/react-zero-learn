/**
 * description
 * 状态驱动
 */
var Header = React.createClass({
    //获取状态
    getInitialState : function () {
        return {enable: false};

    },
    componentWillMount: function () {
        console.log("will");
    },
    componentDidMount: function () {
        console.log("did");
    },
    handleClick : function () {
        //设置状态
        this.setState({
            enable: !this.state.enable
        })
    },
    render: function () {
        var props = this.props;
        return (
            <div>
                <h1 onClick={this.handleClick}>
                    this is {this.props.data} Component.
                </h1>
                <input type="text" disabled={this.state.enable} />
            </div>
        )
    }
})

var Tab = React.createClass({//{{{
    getInitialState: function () {
        return {
            title:this.props.title,
            body:this.props.body
        }
    },
    globalFunc: function () {
        console.log(1)
    },
    render: function () {
        return (
            <div>
                <TabHeader title={this.props.title} body={this.props.body}/>
                <TabBody body={this.props.body}/>
            </div>
        )
    }
})//}}}
var TabHeader = React.createClass({//{{{
    handleClick: function (index) {
        this.setCurrent(index)

    },
    setCurrent: function (index) {
        var update = _.forEach(this.props.title,function(n,key) {
            if(key == index) {
                n.active = true;
            } else {
                n.active = false;

            }
        })

        var updateBody = _.forEach(this.props.body,function(n,key) {
            if(key == index) {
                n.active = true;
            } else {
                n.active = false;

            }
        })

        this.setState({"title":update})
        this.setState({"body":updateBody})

        console.log(this.props)
    },
    render: function () {
        var _this = this;
        return (
            <ul className="tab-header"> {
                this.props.title.map(function(item,index) {

                    var isStatus = item.active ? "add" : "";

                    return <li className={isStatus}
                    onClick={_this.handleClick.bind(this,index)}
                            key={index}>{item.name}
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
        return ( <div className="tab-body">
                {
                this.props.body.map(function (item,index) {

                    var isStatus = item.active ? "add" : "";

                    return <div className={isStatus} key={index}>{item.name}</div>

                })
            }
            </div>
        )
    }
})//}}}

var mountNode = document.getElementById("render");
var tabMount = document.getElementById("tab");
var props = {
    title:[{name:"tab1",active:true},{name:"tab2",active:false}],
    body:[{name:"content1",active:true},{name:"content2",active:false}]
}
React.render(
    <Tab {...props} />,
    tabMount
)
React.render(
    <Header data="Header" />,
    mountNode
)
