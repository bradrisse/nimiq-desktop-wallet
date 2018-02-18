import React from 'react'

class FullHeight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: '0',
            direction: '',
            lastScrollPos: 0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        window.scrollTo(0, 0)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        const {subtract} = this.props
        var _height = window.innerHeight
        if (subtract) {
            _height = _height - subtract
        }
        this.setState({height: _height});
    }

    handleScroll = (event) => {
        if (event.currentTarget.scrollTop === 0) {
            if (this.props.topReached) {
                this.props.topReached()
            }
        } else if (event.currentTarget.scrollTop >= (event.currentTarget.scrollHeight - window.innerHeight - 100)) {
            if (this.props.bottomReached) {
                this.props.bottomReached()
            }
        }
    }

    render() {
        const {height} = this.state
        const {scroll, padding, style} = this.props
        return (
            <div style={{
                height: height,
                overflowY: scroll ? 'scroll' : 'none',
                padding: padding ? padding : 0, ...style
            }} onScroll={this.handleScroll}>
                {this.props.children}
            </div>
        )
    }
}


export default FullHeight;
