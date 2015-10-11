//组件其实是状态机（State Machines）
//React 把用户界面当作简单状态机。把用户界面想像成拥有不同状态然后渲染这些状态，可以轻松让用户界面和数据保持一致。

//React 里，只需更新组件的 state，然后根据新的 state 重新渲染用户界面（不要操作 DOM）。React 来决定如何最高效地更新 DOM。
//this.state 应该仅包括能表示用户界面状态所需的最少数据

var LikeButton = React.createClass({
    getInitialState: function () {
        return {liked: false};
    },
    handleClick: function () {
        this.setState({
            liked: !this.state.liked
        })
        return;
    },
    render: function () {
        var text = this.state.liked ? "YES" :"NO";
        return (
            <button className="mui-btn mui-btn--primary" onClick={this.handleClick}>{text}</button>
        )
    }
})
var Login = React.createClass({
    render: function () {
        return <div></div>
    }
})

var mountNode = document.getElementById("render");
React.render(<LikeButton />,mountNode);
