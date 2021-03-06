//es6  syntax
class HelloMessage extends React.Component {
  render() {
      return <div>Hello {this.props.name}</div>
    }
}

var TodoList = React.createClass({
    render: function () {
       var createItem = function (itemText) {
        return <li>{itemText}</li>
       }
    return <ul>{this.props.items.map(createItem)}</ul>
    }
})

var TodoApp = React.createClass({
    getInitialState: function () {
        return {items: [], text: ''}
    },
    onChange: function (e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var nextItems = this.state.items.concat([this.state.text]);
        var nextText = '';
        this.setState({items: nextItems, text: nextText});
    },
    render: function () {
        return (
            <div>
                <h3>TODO</h3>
                <TodoList items={this.state.items} />
                <form onSubmit={this.handleSubmit}>
                <div className="mui-col-md-3">
                    <input onChange={this.onChange} className="mui-form-control" value={this.state.texta} />
                </div>
                <div className="mui-col-md-1">
                    <button className="mui-btn" data-mui-color="primary">{'添加#' + (this.state.items.length + 1)}</button>
                </div>
                </form>
            </div>
        )
    }
})

var mountNode = document.getElementById("Todo");

React.render(<TodoApp />,mountNode);

console.log(React.Children)
