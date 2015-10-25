// view https://facebook.github.io/react/ for more info

var App = React.createClass({
  render: function() {
    return (<div className="hello">Hello {this.props.name}!</div>);
  }
});

ReactDOM.render(<App name="World" />, document.getElementById('main'));
