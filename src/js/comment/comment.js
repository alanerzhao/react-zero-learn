/**Notes
 * 属性从父传到子级通过props
 * props是不可以改变的单一的
 * state是组件私有的
 * this.setState来改变状态，react是状态驱动的
 * 静态用props 动态用state
 * react使用驼峰命名规范
 * refs 属性给子组件命名，this.refs引用对象getDOMNode获取引用对象对应的dom节点
 */
var converter = new showdown.Converter();
//实例一个commentBox组件
var CommentBox = React.createClass({//{{{

    getInitialState: function () {
        return {data:[]}
    },
    //组件被渲染时调用
    componentDidMount: function () {
        //TODO Scope or bind(this)
        var self = this;
        $.ajax({
            url: '../json/' + this.props.url,
            dataType:"json",
            success: function (data) {
                self.setState({
                    data:data
                })
            },
            error: function () {
                console.log("error");
            }
        })
    },
    //callback 更新状态
    handleCommentSubmit: function (comment) {

        this.state.data.push(comment);

        this.setState({
            data:this.state.data
        })

        console.log("refresh the List");
    },
    render: function () {

    var commentBox = <div className="commentBox">
            <h3>Comments</h3>
            <CommentList data={this.state.data}/>
            <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        </div>

        return ( commentBox );
    }
});//}}}

var CommentList = React.createClass ({//{{{
    render: function () {
        var data = this.props.data;
        var commentItem = data.map(function(item,index) {
            return <Comment author={item.author}>
                        {item.text}
                   </Comment>
        })

        return (
            <div className="commentList mui-panel">
                {commentItem}
            </div>
        )
    }
})//}}}

var Comment = React.createClass ({//{{{
    render: function () {
        //TODO Waring: XSS html
        var rawMarkup = converter.makeHtml(this.props.children.toString())
        return (
            <div className="comment">
                <h2 className="commentAuthor">{this.props.author}</h2>
                <p dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
        )
    }
})//}}}

var CommentForm = React.createClass ({//{{{
    handleSubmit: function (e) {
        e.preventDefault();
        var author = this.refs.author.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();
        if(!text || !author) {
            console.log("empty")
            return;
        }


        //TODO 发送数据到服务器然后清空 && callback
        this.props.onCommentSubmit({
            author:author,
            text:text
        })

        this.refs.author.getDOMNode().value = '';
        this.refs.text.getDOMNode().value = '';

        return;
    },
    render: function () {
        return (
            <form className="commentForm mui-panel" onSubmit={this.handleSubmit}>
                <legend>new Comment</legend>
                <div className="mui-textfield">
                    <input type="text" className="mui-textfield__input" ref="author" placeholder="Input 1" />
                </div>
                <div className="mui-textfield">
                    <textarea className="mui-textfield__input" ref="text" placeholder="Textarea" />
                </div>
                <button type="submit" className="mui-btn mui-btn--raised">Submit</button>
            </form>
        )
    }
})//}}}

var fetchData = [
    {author: "Pete Hunt", text: "This is one comment"},
    {author: "Jordan Walke", text: "This is *another* comment"}
];

//TODO 最后才获取结点更新实际的DOM
//挂载DOM结点
var mountNode = document.getElementById("commentBox");

//根方法启动组件
React.render(
    <CommentBox url="comments.json" />,
    mountNode
);
