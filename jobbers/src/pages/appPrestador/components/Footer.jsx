import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../css/footer.css'

export default class Footer extends Component {
    render() {
        return(
            <footer className="footer display-4">
                <span>
                    Desenvolvido pela <strong> LetsGoFour</strong> 
                </span>
            </footer>
        )
    }
}