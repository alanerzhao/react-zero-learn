//es6  syntax
class HelloMessage extends React.Component {
  render() {
      return <div>Hello {this.props.name}</div>;
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
                    <input onChange={this.onChange} value={this.state.texta} />
                    <button>{'添加#' + (this.state.items.length + 1)}</button>
                </form>
            </div>
        )
    }
})

var mountNode = document.getElementById("Todo");

React.render(<TodoApp />,mountNode);
console.log(React.Children)
