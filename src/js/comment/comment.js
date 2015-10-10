/**Notes
 * 属性从父传到子级通过props
 * props是不可以改变的单一的
 * state是组件私有的
 * this.setState来改变状态，react是状态驱动的
 * 静态用props 动态用state
 */
var converter = new showdown.Converter();
//实例一个commentBox组件
var CommentBox = React.createClass({

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
                setTimeout(function () {
                    self.setState({
                        data:data
                    })
                },1000)
            },
            error: function () {
                console.log("error")
            }
        })
    },

    render: function () {

    var commentBox = <div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={this.state.data}/>
            <CommentForm />
        </div>

        return ( commentBox );
    }
});


var CommentList = React.createClass ({
    render: function () {
        var data = this.props.data;
        var commentItem = data.map(function(item,index) {
            return <Comment author={item.author}>
                        {item.text}
                   </Comment>
        })

        return (
            <div className="commentList">
                {commentItem}
            </div>
        )
    }
})

var CommentForm = React.createClass ({
    render: function () {
        return (
            <div className="commentForm">
            Lorem ipsa reprehenderit obcaecati eligendi vel. Eos sit dolorum exercitationem earum obcaecati possimus, libero illo eveniet non sed rem! Aspernatur magnam enim autem sunt debitis veritatis aliquid veniam quam distinctio.
            </div>
        )
    }
})

var Comment = React.createClass ({
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
})

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
