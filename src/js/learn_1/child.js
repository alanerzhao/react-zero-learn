var Child = React.createClass({
    render : function () {
        this.props.children = ["one","two"];
        return  (
            <div>
                <h2>List Demo</h2>
                <List />
            </div>
        )
    }
})
var List = React.createClass({
    render: function () {
        this.props.children = [1,2,3,4,5];
        var item = this.props.children.map(function (item) {
                return <li>{item}</li>;
        })
        return (
                <ul>
                    {item}
                </ul>
            )
    }
})
var mountNode = document.getElementById("Child");
React.render(<Child />,mountNode);
React.render(<h3>test Render DOM</h3>,document.getElementById("render"));

//存入的是字符串
var names = ['qushuangru','xujiaojiao','fengbaoxian'];
var nameTags = [<h4>baozi</h4>,<h4>qushuangru</h4>];
React.render(
        <div>
            *{nameTags}*
            {
                names.map(function (name) {
                    return <div>{name}</div>
                })
            }
        </div>,
        document.getElementById("renderList")
    )

