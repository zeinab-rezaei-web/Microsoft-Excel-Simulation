let _rowCount = document.querySelectorAll('.cells')
let _cells = document.querySelectorAll('.cells>span')
document.getElementById("fontsize").selectedIndex = "3"
let _color = document.querySelectorAll('.colorbox>span')
for (i=0; i<_color.length; i++){
    let colorcode = _color[i].getAttribute('data-color')
    _color[i].style.backgroundColor = colorcode
}
function _borderreset(e){
    // reset the border of selected cell
    let _cell = e.target
    for(i = 0 ; i <_cells.length ; i++){
        let c_stat = _cells[i].getAttribute('data-c')
        let dc_stat = _cells[i].getAttribute('data-dc')
        _cells[i].style.cursor='cell'
        if(c_stat == 'false'){
            _cells[i].style.border = '1px solid rgb(199, 199, 199)'
            _cells[i].style.setProperty('--cellOpacity' , 0)
            _cells[i].setAttribute('data-c' , 'true')
        }
        if(dc_stat == 'false'){
            _cells[i].setAttribute('contenteditable', 'false')
            _cells[i].style.border = '1px solid rgb(199, 199, 199)'
            _cells[i].style.setProperty('--cellOpacity' , 0)
            _cells[i].setAttribute('data-dc' , 'true')
            // _cell.style.cursor='cell'
        }
    }
}
function _cellreset(){
    // reset the first child of any row
    for(i = 1 ; i<=_rowCount.length ; i++){
        let cell1= document.querySelector('#row'+[i]+'>span:nth-of-type(1)')
        cell1.style.backgroundColor='rgba(92, 92, 92, 0.265)'
        cell1.style.borderRight='none'
        cell1.style.color='black'
    }
    for(i = 1 ; i<14 ; i++){
        let cell2 = document.querySelector('#columns>span:nth-of-type('+[i]+')')
        cell2.style.backgroundColor = 'rgba(92, 92, 92, 0.265)'
        cell2.style.borderBottom='none'
        cell2.style.color='black'
    }
}
function _rowreset(e){
    // reset the selected row background
    let child = document.querySelectorAll('.cells>span:nth-of-type(1)')
    for(i=0 ; i<child.length; i++){
        let parents = child[i].parentElement
        parents.classList.remove('rclick')
        child[i].style.backgroundColor= 'rgba(128, 128, 128, 0.265)'
    }
}
function _colreset(e){
    // reset the selected column background
    let child = document.querySelectorAll('.cells>span:is(.cclick)')
    for(i=0 ; i<child.length; i++){
        child[i].classList.remove('cclick')
    }
}
function _topleft(_cell){
    let _parent = _cell.parentElement
    let _id= _parent.getAttribute('id')
    let cell1 = document.querySelector('#'+_id+'>span:nth-of-type(1)')
    cell1.style.backgroundColor='rgba(92, 92, 92, 0.365)'
    cell1.style.borderRight='2px solid #188038'
    cell1.style.color='#188038'
    let _childid = _cell.getAttribute('class')
    _childid = Number(_childid.substring(5, 7))
    _childid = _childid + 1
    let cell2 = document.querySelector('#columns>span:nth-of-type('+_childid+')')
    cell2.style.backgroundColor = 'rgba(92, 92, 92, 0.365)'
    cell2.style.borderBottom='2px solid #188038'
    cell2.style.color='#188038'
}
let bold = document.getElementsByClassName('icon-bold')[0]
let italic = document.getElementsByClassName('icon-italic-1')[0]
let underline = document.getElementsByClassName('icon-underline')[0]
let _fname = document.getElementById('fontname')
let _fsize = document.getElementById('fontsize')

function _stylereset(e){
    let _cell = e.target
    let bstat= _cell.getAttribute('data-b')
    let istat= _cell.getAttribute('data-i')
    let ustat = _cell.getAttribute('data-u')
    let fnstat = _cell.getAttribute('data-fn')
    let fsstat = _cell.getAttribute('data-fs')
    if( bstat == 'false'){
        bold.style.backgroundColor= 'grey'
    }else{
        bold.style.backgroundColor= 'transparent'
    }
    if( istat == 'false'){
        italic.style.backgroundColor= 'grey'
    }else{
        italic.style.backgroundColor= 'transparent'
    }
    if( ustat == 'false'){
        underline.style.backgroundColor= 'grey'
    }else{
        underline.style.backgroundColor= 'transparent'
    }
    if( fnstat == 'false'){
        let test1 = _cell.getAttribute('data-fnhistory')
        _fname.selectedIndex = test1
    }else{
        _fname.selectedIndex = 0
    }
    if( fsstat == 'false'){
        let test2 = _cell.getAttribute('data-fshistory')
        _fsize.selectedIndex = test2
    }else{
        _fsize.selectedIndex = 3
    }
}
function _singleclick(e){
    let _cell = e.target
    _borderreset(e)
    _cellreset()
    _rowreset(e)
    _colreset(e)
    // _colorboxreset()
    _cell.style.border= '2px solid #188038'
    _cell.style.setProperty('--cellOpacity' , 1)
    _cell.setAttribute('data-c' , 'false')
    _topleft(_cell)
    _stylereset(e)   
    if(flag == 'true'){
        _cell.style.color = tempfc
        _cell.style.fontSize = tempfs
        _cell.style.fontFamily = tempfn
        _cell.style.backgroundColor = tempbgc
        _cell.style.fontWeight = tempfw
        _cell.style.textDecoration = tempfu
        _cell.style.fontStyle = tempfi
        flag = 'false'
        if(tempfw == '700'){
            bold.style.backgroundColor = 'grey'
            _cell.setAttribute('data-b' , 'false')
        }
        if(tempfi == 'italic'){
            italic.style.backgroundColor = 'grey'
            _cell.setAttribute('data-i' , 'false')
        }
        tempfu = tempfu.substring(0, 9)
        if(tempfu == 'underline'){
            underline.style.backgroundColor = 'grey'
            _cell.setAttribute('data-u' , 'false')
        }
        _cell.setAttribute('data-fshistory' , tempfshistory)
        _cell.setAttribute('data-fnhistory' , tempfnhistory)
        _cell.setAttribute('data-fn' , 'false')
        _cell.setAttribute('data-fs' , 'false')
        _fsize.selectedIndex = tempfshistory
        _fname.selectedIndex = tempfnhistory
    } 
}
function _doubleclick(e){
    let _cell = e.target
    _borderreset(e)
    _cell.setAttribute('contenteditable', 'true')
    _cell.focus()
    _cell.style.border= '2px solid #188038'
    _cell.style.outline= 'none'
    _cell.setAttribute('data-dc' , 'false')
    _cell.style.cursor='text'
}
function _active(temp){
    _borderreset(temp)
    temp.style.border= '2px solid #188038'
    temp.style.setProperty('--cellOpacity' , 1)
    temp.setAttribute('data-c' , 'false')
}
function _keyup(e){
    let temp 
    let _pre  
    let _next
    let _bottom
    let _top
    for(i = 0 ; i <_cells.length ; i++){
        let c_stat = _cells[i].getAttribute('data-c')
        let dc_stat = _cells[i].getAttribute('data-dc')
        if(c_stat == 'false' || dc_stat == 'false'){
            temp = _cells[i]
        }
    }   
    let _keynum = Number(e.which)
    let _parent = temp.parentElement
    let _parentid = _parent.getAttribute('id')
    _parentid = Number(_parentid.substring(3, 5))
    let _topparentid = _parentid - 1
    let _bottomparentid = _parentid + 1
    let _childid = temp.getAttribute('class')
    _childid = Number(_childid.substring(5, 7))
    _childid = _childid + 1
    _pre = temp.previousElementSibling
    _next = temp.nextElementSibling
    _top = document.querySelector('#row'+_topparentid+'>span:nth-of-type('+_childid+')')
    _bottom = document.querySelector('#row'+_bottomparentid+'>span:nth-of-type('+_childid+')')
    switch(_keynum){
        case 37: 
            _active(_pre);
            _cellreset();
            _topleft(_pre);
            temp = _pre;
            break;
        case 38:
            _active(_top);
            _cellreset();
            _topleft(_top);
            temp = top;
            break;
        case 39:
            _active(_next);
            _cellreset();
            _topleft(_next);
            temp = _next;
            break;
        case 40:
            _active(_bottom);
            _cellreset();
            _topleft(_bottom);
            temp = _bottom;
            break;
        case 13:
            _active(_bottom);
            _cellreset();
            _topleft(_bottom);
            temp = _bottom;
            break;
        default:
            temp.setAttribute('contenteditable', 'true')
            temp.focus()
            temp.style.border= '2px solid #188038'
            temp.style.outline= 'none'
            temp.setAttribute('data-dc' , 'false')
            temp.style.cursor='text'
    }
    // _stylereset(temp);
}

function _cHover(self){
    let child = document.getElementById('columns').children
    for(i=0 ; i<child.length; i++){
        child[i].classList.remove('chover')
    }
    self.classList.add('chover')
}
function _cLeave(self){
    self.classList.remove('chover')
}
function _rHover(self){
    let child = document.querySelectorAll('.cells>span:nth-of-type(1)')
    for(i=0 ; i<child.length; i++){
        child[i].classList.remove('chover')
    }
    self.classList.add('chover')
}
function _rLeave(self){
    self.classList.remove('chover')
}
function _rClick(e){
    _cellreset()
    _borderreset(e)
    _rowreset(e)
    _colreset(e)
        e.style.backgroundColor= '#0ea53c54'
        let parent = e.parentElement
        parent.classList.add('rclick')  
}
function _cClick(e){
    _cellreset()
    _borderreset(e)
    _rowreset(e)
    _colreset(e)
    let _childid = e.getAttribute('class')
    _childid = Number(_childid.substring(6, 8))
    // console.log(_childid);
    _childid = _childid + 1
    for(i=1 ; i<=_rowCount.length ; i++){
        let _col = document.querySelector('#row'+[i]+'>span:nth-of-type('+_childid+')')
        _col.classList.add('cclick') 
    }
}
// function _colorboxreset(){
//     let stat = _colorbox.getAttribute('data-stat')
//     if(stat == 'false'){
//         _colorbox.style.opacity=0
//         _colorbox.style.visibility='hidden'     
//         let fontcolor = document.querySelector('#fontcolor>figure')
//         let bgcolor = document.querySelector('#bgcolor>figure')
//         bgcolor.style.backgroundColor='transparent'
//         fontcolor.style.backgroundColor='transparent'
//         bgcolor.setAttribute('data-stat' , 'true')
//         fontcolor.setAttribute('data-stat' , 'true')
//     }
// }
let _colorbox = document.getElementsByClassName('colorbox')[0]
function _openbgcolorbox(e){
    let child = e.children
    let stat = _colorbox.getAttribute('data-stat')
    let thisstat = e.getAttribute('data-stat')
    let other = document.querySelector('#fontcolor>figure')
    let otherchild = other.children
    if(stat == 'true'){
        _colorbox.style.opacity=1
        _colorbox.style.visibility='visible'
        e.style.backgroundColor='rgba(128, 128, 128, 0.422)'
        child[2].style.backgroundColor='rgba(128, 128, 128, 0.422)'
        _colorbox.style.left='-102px'
        _colorbox.style.top='18px'
        _colorbox.setAttribute('data-stat' , 'false')
        e.setAttribute('data-stat' , 'false')
    }
    else if(stat == 'false' && thisstat == 'true'){
        e.style.backgroundColor='rgba(128, 128, 128, 0.422)'
        child[2].style.backgroundColor='rgba(128, 128, 128, 0.422)'
        _colorbox.style.left='-102px'
        _colorbox.style.top='18px'
        other.style.backgroundColor='transparent'
        otherchild[2].style.backgroundColor='transparent'
        other.setAttribute('data-stat' , 'true')
        e.setAttribute('data-stat' , 'false')        
    }
    else if(stat == 'false' && thisstat == 'false'){
        _colorbox.style.opacity=0
        _colorbox.style.visibility='hidden'
        e.style.backgroundColor='transparent'
        child[2].style.backgroundColor='transparent'
        _colorbox.setAttribute('data-stat' , 'true')
        e.setAttribute('data-stat' , 'true')
    }
}
function _openfontcolorbox(e){
    let child = e.children
    let _colorbox = document.getElementsByClassName('colorbox')[0]
    let stat = _colorbox.getAttribute('data-stat')
    let thisstat = e.getAttribute('data-stat')
    let other = document.querySelector('#bgcolor>figure')
    let otherchild = other.children
    if(stat == 'true'){
        _colorbox.style.opacity=1
        _colorbox.style.visibility='visible'
        e.style.backgroundColor='rgba(128, 128, 128, 0.422)'
        child[2].style.backgroundColor='rgba(128, 128, 128, 0.422)'
        _colorbox.style.left='-35px'
        _colorbox.style.top='18px'
        _colorbox.setAttribute('data-stat' , 'false')
        e.setAttribute('data-stat' , 'false')
    }
    else if(stat == 'false' && thisstat == 'true'){
        e.style.backgroundColor='rgba(128, 128, 128, 0.422)'
        child[2].style.backgroundColor='rgba(128, 128, 128, 0.422)'
        _colorbox.style.left='-35px'
        _colorbox.style.top='18px'
        other.style.backgroundColor='transparent'
        otherchild[2].style.backgroundColor='transparent'
        other.setAttribute('data-stat' , 'true')
        e.setAttribute('data-stat' , 'false')        
    }
    else if(stat == 'false' && thisstat == 'false'){
        _colorbox.style.opacity=0
        _colorbox.style.visibility='hidden'
        e.style.backgroundColor='transparent'
        child[2].style.backgroundColor='transparent'
        _colorbox.setAttribute('data-stat' , 'true')
        e.setAttribute('data-stat' , 'true')
    }
}

function _getcolor(e){
    let bg = document.querySelector('#bgcolor>figure')
    let bgfigcaption = document.querySelector('#bgcolor>figure>figcaption')
    let font = document.querySelector('#fontcolor>figure')
    let fontfigcaption = document.querySelector('#fontcolor>figure>figcaption')
    let bgstat = bg.getAttribute('data-stat')
    let bgchild = bg.children
    let fontstat = font.getAttribute('data-stat')
    let fontchild = font.children
    let _cells = document.querySelectorAll('.cells>span')
    let selectedcolor = e.getAttribute('data-color')
    let _colorbox = document.querySelector('.colorbox')
    if(bgstat == 'false'){
        for(i = 0 ; i <_cells.length ; i++){
            let c_stat = _cells[i].getAttribute('data-c')
            if(c_stat == 'false'){
                _cells[i].style.backgroundColor = selectedcolor
                bgfigcaption.style.backgroundColor = selectedcolor
                _colorbox.style.opacity = 0
                _colorbox.style.visibility='hidden'
                bg.setAttribute('data-stat', 'true')
                _colorbox.setAttribute('data-stat' , 'true')
                bg.style.backgroundColor='transparent'
                bgchild[2].style.backgroundColor='transparent'
            }
        }
    }
    else if(fontstat == 'false'){
        for(i = 0 ; i <_cells.length ; i++){
            let c_stat = _cells[i].getAttribute('data-c')
            if(c_stat == 'false'){
                _cells[i].style.color= selectedcolor
                fontfigcaption.style.backgroundColor = selectedcolor
                _colorbox.style.opacity=0
                _colorbox.style.visibility='hidden'
                font.setAttribute('data-stat', 'true')
                _colorbox.setAttribute('data-stat' , 'true')
                font.style.backgroundColor='transparent'
                fontchild[2].style.backgroundColor='transparent'
            }
        }
    }
}

function _getfontname(e){
    let _selectedfont = e.selectedIndex
    let temp
    let history
    switch(_selectedfont){
        case 0: 
            temp= "'Times New Roman', serif"
            history = 0
            break;
        case 1:
            temp= "Arial, sans-serif"
            history = 1
            break;
        case 2:
            temp = "Verdana, sans-serif"
            history = 2
            break;
        case 3:
            temp = "Tahoma, sans-serif"
            history = 3
            break;
        case 4:
            temp = "'Trebuchet MS', sans-serif"
            history = 4
            break;
        case 5:
            temp = "Georgia, serif"
            history = 5
            break;
        case 6:
            temp = "Garamond, serif"
            history = 6
            break;
        case 7:
            temp = "'Courier New', monospace"
            history = 7
            break;
        case 8:
            temp = "'Brush Script MT', cursive"
            history = 8
            break;
    }
    for(i = 0 ; i <_cells.length ; i++){
        let c_stat = _cells[i].getAttribute('data-c')
        if(c_stat == 'false'){
            _cells[i].style.fontFamily= temp
            _cells[i].setAttribute('data-fnhistory' , history)
            _cells[i].setAttribute('data-fn' , 'false')
        }
    }
}
function _getfontsize(e){
    let x = e.selectedIndex
    let y = e.options
    let _selectedfont = y[x].value
    for(i = 0 ; i <_cells.length ; i++){
        let c_stat = _cells[i].getAttribute('data-c')
        if(c_stat == 'false'){
            _cells[i].style.fontSize= _selectedfont+'px'
            _cells[i].setAttribute('data-fshistory' , x)
            _cells[i].setAttribute('data-fs' , 'false')
        }
    }
}

function _increasefont(e){
    let _fontsize = document.getElementById('fontsize')
    for(i = 0 ; i <_cells.length ; i++){
        let c_stat = _cells[i].getAttribute('data-c')
        if(c_stat == 'false'){
            let temp =_cells[i].computedStyleMap().get('font-size')
            temp = temp.value
            if(temp>7 && temp<12){
                temp +=1
                _cells[i].style.fontSize= temp+'px'
                let yy = _fontsize.options                
                for(j=0;j<yy.length;j++){
                    let zz = yy[j].value
                    if(zz == temp){
                        let mm = yy[j].index
                        // console.log(yy[j].index);
                        _fontsize.selectedIndex= mm
                        _cells[i].setAttribute('data-fshistory' , mm)
                        _cells[i].setAttribute('data-fs' , 'false')
                    }
                }
            }
            else if(temp>11 && temp<19){
                temp +=2
                _cells[i].style.fontSize= temp+'px'   
                let yy = _fontsize.options    
                for(j=0;j<yy.length;j++){
                    let zz = yy[j].value
                    if(zz == temp){
                        let mm = yy[j].index
                        // console.log(yy[j].index);
                        _fontsize.selectedIndex= mm
                        _cells[i].setAttribute('data-fshistory' , mm)
                        _cells[i].setAttribute('data-fs' , 'false')         
                    }
                }
            }
        }
    }
}
function _decreasefont(e){
    let _fontsize = document.getElementById('fontsize')
    for(i = 0 ; i <_cells.length ; i++){
        let c_stat = _cells[i].getAttribute('data-c')
        if(c_stat == 'false'){
            let temp =_cells[i].computedStyleMap().get('font-size')
            temp = temp.value
            if(temp>8 && temp<12){
                temp -=1
                _cells[i].style.fontSize= temp+'px'
                let yy = _fontsize.options                
                for(j=0;j<yy.length;j++){
                    let zz = yy[j].value
                    if(zz == temp){
                        let mm = yy[j].index
                        // console.log(yy[j].index);
                        _fontsize.selectedIndex= mm
                        _cells[i].setAttribute('data-fshistory' , mm)
                        _cells[i].setAttribute('data-fs' , 'false') 
                    }
                }
            }
            else if(temp>11 && temp<21){
                temp -=2
                _cells[i].style.fontSize= temp+'px'            
                let yy = _fontsize.options    
                for(j=0;j<yy.length;j++){
                    let zz = yy[j].value
                    if(zz == temp){
                        let mm = yy[j].index
                        // console.log(yy[j].index);
                        _fontsize.selectedIndex= mm
                        _cells[i].setAttribute('data-fshistory' , mm)
                        _cells[i].setAttribute('data-fs' , 'false') 
                    }
                }
            }
        }
    }
}

let _cellvalue 
function _copy(e){
    for(i = 0 ; i <_cells.length ; i++){
        let c_stat = _cells[i].getAttribute('data-c')
        if(c_stat == 'false'){
            _cellvalue = _cells[i].innerHTML
        }
    }
}
function _cut(e){
    for(i = 0 ; i <_cells.length ; i++){
        let c_stat = _cells[i].getAttribute('data-c')
        if(c_stat == 'false'){
            _cellvalue = _cells[i].innerHTML
            _cells[i].innerHTML = ''
        }
    }
}
function _paste(e){
    for(i = 0 ; i <_cells.length ; i++){
        let c_stat = _cells[i].getAttribute('data-c')
        if(c_stat == 'false'){
            if(_cellvalue == null){
                _cells[i].innerHTML = ''
            }else{
                _cells[i].innerHTML = _cellvalue
            }
        }
    }
}
let flag
let tempfs
let tempfn
let tempfc
let tempbgc
let tempfw
let tempfi
let tempfu
let tempfnhistory
let tempfshistory
function _formatpainter(e){
    for(i = 0 ; i <_cells.length ; i++){
        let c_stat = _cells[i].getAttribute('data-c')
        _cells[i].style.cursor="url('../Excel Simulation/assets/img/format2.png'), auto"
        if(c_stat == 'false'){
            let temp = getComputedStyle(_cells[i])
            tempfs = temp.getPropertyValue(temp[123])
            tempfn = temp.getPropertyValue(temp[119])
            tempfc = temp.getPropertyValue(temp[80])
            tempbgc = temp.getPropertyValue(temp[20])
            tempfw = temp.getPropertyValue(temp[135])
            tempfi = temp.getPropertyValue(temp[125])
            tempfu = temp.getPropertyValue(temp[266])
            tempfnhistory = _cells[i].getAttribute('data-fnhistory')
            tempfshistory = _cells[i].getAttribute('data-fshistory')
            _cells[i].style.border='2px dashed #188038'
            flag = 'true'
        }
    }
}
function _bolder(e){ 
    for(i = 0 ; i <_cells.length ; i++){
        let c_stat = _cells[i].getAttribute('data-c')
        if(c_stat == 'false'){
            let bstat = _cells[i].getAttribute('data-b')
            if(bstat == 'true'){
                _cells[i].style.fontWeight= 'bolder'
                _cells[i].setAttribute('data-b' , 'false')
                e.style.backgroundColor= 'grey'
            }
            else if(bstat == 'false'){
                _cells[i].style.fontWeight= 'normal'
                _cells[i].setAttribute('data-b' , 'true')
                e.style.backgroundColor= 'transparent'
            }
        }
    }
}
function _italic(e){
    for(i = 0 ; i <_cells.length ; i++){
        let c_stat = _cells[i].getAttribute('data-c')
        if(c_stat == 'false'){
            let istat = _cells[i].getAttribute('data-i')
            if(istat == 'true'){
                _cells[i].style.fontStyle= 'italic'
                _cells[i].setAttribute('data-i' , 'false')
                e.style.backgroundColor= 'grey'
            }
            else if(istat == 'false'){
                _cells[i].style.fontStyle= 'normal'
                _cells[i].setAttribute('data-i' , 'true')
                e.style.backgroundColor= 'transparent'
            }
        }
    }
}
function _underline(e){
    for(i = 0 ; i <_cells.length ; i++){
        let c_stat = _cells[i].getAttribute('data-c')
        if(c_stat == 'false'){
            let ustat = _cells[i].getAttribute('data-u')
            if(ustat == 'true'){
                _cells[i].style.textDecoration= 'underline'
                _cells[i].setAttribute('data-u' , 'false')
                e.style.backgroundColor= 'grey'
            }
            else if(ustat == 'false'){
                _cells[i].style.textDecoration= 'none'
                _cells[i].setAttribute('data-u' , 'true')
                e.style.backgroundColor= 'transparent'
            }
        }
    }
}
let _xpos
let _width
let _xtemp

function _mousemove(e){
    let _xpos = Number(e.offsetX)
    let self= e.target
    let _width = self.clientWidth
    let _xtemp = _width / 8
    _xtemp = _width - _xtemp
    // console.log(_width + 'w')
    // console.log(_xtemp + 't')
    // console.log(_xpos + 'xp')
    if(_xtemp < _xpos){
        self.style.cursor='col-resize'
        // _mousedown(e)
        self.style.resize='horizontal'
        self.style.overflow='auto'
        let _colwidth = self.clientWidth
        // console.log(_colwidth);
        let cols = document.querySelectorAll('#columns>span')
        for (i= 1 ; i<= cols.length ; i++){
            // cols[i].style.backgroundColor = 'red'
            // cols[i].style.height= '101px'
        }
    }
    else{
        self.style.cursor="url('../Excel Simulation/assets/img/cursor-arrow-bottom.png'), auto"
    }

}
function closeexcel(e){
    document.getElementById('closewindow').style.display = 'block'
    document.getElementById('shadow').style.display = 'block'
}
function closealert(e){
    document.getElementById('closewindow').style.display = 'none'
    document.getElementById('shadow').style.display = 'none'
}
function openmenu(e){
    document.getElementById('sidemenu').style.left = 0
    document.getElementById('sidemenu').style.opacity = 1
}
function closemenu(e){
    document.getElementById('sidemenu').style.left = -100 + '%'
    document.getElementById('sidemenu').style.opacity = 0
}