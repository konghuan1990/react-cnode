/**
 * @author sunny
 * @email 17765293970@163.com
 * @create date 2018-01-27 10:18:39
 * @modify date 2018-01-27 10:18:39
 * @desc loading
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './Dialog.less';

export default class Dialog extends Component {
    changeBtnColor = () => {}
    confirm = () => {
        let { confirmCallBack } = this.props;
        let dataDom = this.refs.data;
        let data = dataDom ? dataDom.value : '';
        confirmCallBack && confirmCallBack(data);
    }
    cancel = () => {
        let { cancelCallBack } = this.props;
        cancelCallBack && cancelCallBack();
    }
    oneBtn = () => {
        let { oneBtnCallBack } = this.props;
        oneBtnCallBack && oneBtnCallBack();
    }
	render() {
        let { title, showInput, message, showTitle, useText, text, showOneBtn, oneBtnText, cancelButtonText, confirmButtonText, inputPlaceholder } = this.props;
		return (
            <div className="dialog-mask">
                <div className="dialog-wraper">
                    {
                        (() => {
                            if (showInput) {
                                return (
                                    <div className="dialog-input-container">
                                        { showTitle ? <div className="dialog-input-header">{ title }</div> : null }
                                        <div className="dialog-input-body">
                                            <input type="text" ref="data" onInput={() => this.changeBtnColor()} placeholder={inputPlaceholder} className="dialog-input-textbox" />
                                        </div>
                                        <div className="dialog-input-btn">
                                            <input className="dialog-input-btn-cancel f-c666666 dialog-b-right" type="button" onClick={() => this.cancel()} value={cancelButtonText} />
                                            <input className="dialog-input-btn-confirm f-cgreen" type="button" onClick={() => this.confirm()} value={confirmButtonText} />
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="dialog-container">
                                        { showTitle ? <div className="dialog-input-header">{ title }</div> : null }
                                        <div className="dialog-body f-c666666">
                                            <div>
                                                {
                                                    useText ?
                                                    <div dangerouslySetInnerHTML={(() => {
                                                        return {__html: text};
                                                    })()} />
                                                    :
                                                    <div>{ message }</div>
                                                }
                                            </div>
                                        </div>
                                        {(() => {
                                            if(showOneBtn) {
                                                return (
                                                    <div className="dialog-btn">
                                                        <input type="button" style={{width: '100%'}} className="dialog-one-btn f-cgreen" value={oneBtnText} onClick={() => this.oneBtn()} />
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div className="dialog-btn">
                                                        <input className="dialog-btn-cancel f-c666666 dialog-b-right" type="button" onClick={() => this.cancel()} value={cancelButtonText} />
                                                        <input className="dialog-btn-confirm f-cgreen" type="button" onClick={() => this.confirm()} value={confirmButtonText} />
                                                    </div>
                                                );
                                            }
                                        })()}
                                    </div>
                                );
                            }
                        })()
                    }
                </div>
            </div>
		);
	}
}

Dialog.propTypes = {
    tip: PropTypes.string,
};

Dialog.newInstance = function newLoadingInstance(properties) {
    let props = properties || {};
    let div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(React.createElement(Dialog, props), div);
    return {
        destroy() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        },
    };
};
