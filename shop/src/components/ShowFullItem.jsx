import React, { Component } from "react";
import { FaTimes } from 'react-icons/fa'
import { FaSearchPlus } from 'react-icons/fa'

export class ShowFullItem extends Component {
  constructor(props) {
    super(props)
    this.state = { viewerOpen: false, viewerZoomed: false }
    this.openViewer = this.openViewer.bind(this)
    this.closeViewer = this.closeViewer.bind(this)
    this.onShowClose = this.onShowClose.bind(this)
    this.toggleViewerZoom = this.toggleViewerZoom.bind(this)
  }

  openViewer(e) {
    e.stopPropagation()
    this.setState({ viewerOpen: true, viewerZoomed: false })
  }

  closeViewer(e) {
    if (e) e.stopPropagation()
    this.setState({ viewerOpen: false, viewerZoomed: false })
  }

  onShowClose(e) {
    e.stopPropagation()
    this.props.onShowItem(this.props.item)
  }

  toggleViewerZoom(e) {
    e.stopPropagation()
    this.setState(({ viewerZoomed }) => ({ viewerZoomed: !viewerZoomed }))
  }

  render() {
    const { item } = this.props
    return (
      <div className="full-item" onClick={this.onShowClose}>
        <div onClick={(e) => e.stopPropagation()}>
          <button className="close-full" onClick={this.onShowClose}><FaTimes/></button>
          <img
            src={"./img/" + item.img}
            alt="staff"
          />
          <h2>{item.title}</h2>
          <p>{item.desc}</p>
          <b>{item.price}$</b>
          <div
            className="add-to-cart"
            onClick={() => this.props.onAdd(item)}
          >
            +
          </div>
          <button className="view-image" onClick={this.openViewer}><FaSearchPlus/></button>
        </div>

        {this.state.viewerOpen && (
          <div className="photo-viewer" onClick={this.closeViewer}>
            <div className="photo-viewer-inner" onClick={(e) => e.stopPropagation()}>
              <button className="pv-close" onClick={this.closeViewer}><FaTimes/></button>
              <div className="pv-img-wrap">
                <img
                  src={"./img/" + item.img}
                  alt={item.title}
                  className={this.state.viewerZoomed ? 'zoomed' : ''}
                  onClick={this.toggleViewerZoom}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ShowFullItem;
