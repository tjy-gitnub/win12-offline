// 列表点击 + 边框发光
// document.querySelectorAll(`#s-m-l>list>a,#win-setting>.menu>list>a`).forEach(la => {
//     la.addEventListener('mousemove', e => {
//         x = e.clientX - $(la).offset()['left'];
//         y = e.clientY - $(la).offset()['top'];
//         $(la).css('cssText', `background:radial-gradient(circle at ${x}px ${y}px,var(--hover) 20px, #00000000) center;background-size:110% 100%;border-image:radial-gradient(circle at ${x}px ${y}px,var(--hover) 20px, #00000000 40px) 2;`)
//     });
//     la.addEventListener('mouseout', () => {
//         $(la).css('cssText', `background-image:radial-gradient(#00000000,#00000000),radial-gradient(#00000000,#00000000);`)
//     });
// });

document.querySelectorAll(`list.focs`).forEach(li => {
    // li.querySelectorAll(`a`).forEach(la => {
    //     la.addEventListener('click',e => {
    //         let _=li.querySelector('span.focs');
    //         $(_).addClass('cl');
    //         $(_).css('top',la.offsetTop-li.offsetTop);
    //         $(_).css('left',la.offsetLeft-li.offsetLeft);
    //     });
    // });
    li.addEventListener('click', e => {
        let _ = li.querySelector('span.focs'), la = li.querySelector('a.check'),
            las = li.querySelectorAll('a');
        $(_).addClass('cl');
        $(_).css('top', la.offsetTop - las[las.length - 1].offsetTop);
        $(_).css('left', la.offsetLeft - li.offsetLeft);
        setTimeout(() => {
            $(_).removeClass('cl');
        }, 500);
    })
});
// 禁止拖拽图片
$('img').on('dragstart', () => { return false; });
// 右键菜单
$('html').on('contextmenu', () => {
    return false;
});
function stop(e) {
    e.stopPropagation();
    return false;
}
$('input,textarea,*[contenteditable=true]').on('contextmenu', (e) => {
    stop(e);
    return true;
});
let cms = {
    'titbar': [
        function (arg) {
            if (arg == 'calc' || arg == 'notepad-fonts') {
                return 'null';
            }
            if ($('.window.' + arg).hasClass("max")) {
                return ['<i class="bi bi-window-stack"></i> 还原', `maxwin('${arg}')`];
            }
            else {
                return ['<i class="bi bi-window-fullscreen"></i> 最大化', `maxwin('${arg}')`];
            }
        },
        function (arg) {
            if (arg == 'notepad-fonts') {
                return 'null';
            }
            else {
                return ['<i class="bi bi-window-dash"></i> 最小化', `minwin('${arg}')`];
            }
        },
        function (arg) {
            if (arg == 'notepad-fonts') {
                return ['<i class="bi bi-window-x"></i> 关闭', `hidewin('${arg}', 'configs')`];
            }
            else {
                return ['<i class="bi bi-window-x"></i> 关闭', `hidewin('${arg}')`];
            }
        },
    ],
    'desktop': [
        ['<i class="bi bi-arrow-clockwise"></i> 刷新', `$('#desktop').css('opacity','0');setTimeout(()=>{$('#desktop').css('opacity','1');},100);`],
        ['<i class="bi bi-circle-square"></i> 切换主题', 'toggletheme()'],
        `<a onmousedown="window.open('https://github.com/tjy-gitnub/win12','_blank');" win12_title="https://github.com/tjy-gitnub/win12" onmouseenter="showdescp(event)" onmouseleave="hidedescp(event)"><i class="bi bi-github"></i> 在 Github 中查看此项目</a>`,
        `<a onmousedown="window.open('https://github.com/tjy-gitnub/win12/issues','_blank');" win12_title="https://github.com/tjy-gitnub/win12/issues" onmouseenter="showdescp(event)" onmouseleave="hidedescp(event)"><i class="bi bi-chat-left-text"></i> 发送反馈</a>`,
        ['<i class="bi bi-info-circle"></i> 关于 Win12 网页版', `$('#win-about>.about').addClass('show');$('#win-about>.update').removeClass('show');openapp('about');if($('.window.about').hasClass('min'))minwin('about');`],
    ],
    'winx': [
        function (arg) {
            if ($('#start-menu').hasClass("show")) {
                return ['<i class="bi bi-box-arrow-in-down"></i> 关闭开始菜单', `hide_startmenu()`];
            }
            else {
                return ['<i class="bi bi-box-arrow-in-up"></i> 打开开始菜单', `$('#start-btn').addClass('show');
                if($('#search-win').hasClass('show')){$('#search-btn').removeClass('show');
                $('#search-win').removeClass('show');setTimeout(() => {$('#search-win').removeClass('show-begin');
                }, 200);}$('#start-menu').addClass('show-begin');setTimeout(() => {$('#start-menu').addClass('show');
                }, 0);`];
            }
        },
        '<hr>',
        ['<i class="bi bi-gear"></i> 设置', `openapp('setting')`],
        ['<i class="bi bi-folder2-open"></i> 文件资源管理器', `openapp('explorer')`],
        ['<i class="bi bi-search"></i> 搜索', `$('#search-btn').addClass('show');hide_startmenu();
        $('#search-win').addClass('show-begin');setTimeout(() => {$('#search-win').addClass('show');
        $('#search-input').focus();}, 0);`],
        '<hr>',
        ['<i class="bi bi-power"></i> 关机', `window.location='shutdown.html'`],
        ['<i class="bi bi-arrow-counterclockwise"></i> 重启', `window.location='reload.html'`],
    ],
    'smapp': [
        function (arg) {
            return ['<i class="bi bi-window"></i> 打开', `openapp('${arg[0]}');hide_startmenu();`];
        },
        function (arg) {
            return ['<i class="bi bi-link-45deg"></i> 在桌面创建链接', "$('#desktop').append(`<div class='b' ondblclick=openapp('" + arg[0] + "')  ontouchstart=openapp('" + arg[0] + "')><img src='icon/" + arg[0] + ".png'><p>" + arg[1] + "</p></div>`)"];
        }
    ],
    'dockabout': [
        function (arg) {
            if (arg) {
                return ['<i class="bi bi-arrow-bar-down"></i> 收起', `$('.dock.about').removeClass('show')`];
            }
            else {
                return ['<i class="bi bi-arrow-bar-up"></i> 展开', `$('.dock.about').addClass('show')`];
            }
        },
        ['<i class="bi bi-info-circle"></i> 更多信息', `$('#win-about>.about').addClass('show');$('#win-about>.update').removeClass('show');
        openapp('about');if($('.window.about').hasClass('min'))minwin('about');$('.dock.about').removeClass('show')`]
    ],
    'msgupdate': [
        ['<i class="bi bi-layout-text-window-reverse"></i> 查看详细', `openapp('about');if($('.window.about').hasClass('min'))
        minwin('about');$('#win-about>.about').removeClass('show');$('#win-about>.update').addClass('show');
        $('#win-about>.update>div>details:first-child').attr('open','open')`],
        ['<i class="bi bi-box-arrow-right"></i> 关闭', `$('.msg.update').removeClass('show')`]
    ],
    'explorer.content': [
        ['<i class="bi bi-arrow-clockwise"></i> 刷新', `$('#win-explorer>.main>.content>.view').css('opacity','0');setTimeout(()=>{$('#win-explorer>.main>.content>.view').css('opacity','1');},100);`],
    ],
    'explorer.folder': [
        (arg) => {
            return ['<i class="bi bi-folder2-open"></i> 打开', `apps.explorer.goto('${arg}')`];
        }
    ],
    'edge.tab': [
        arg => {
            return ['<i class="bi bi-pencil-square"></i> 命名标签页', `apps.edge.c_rename(${arg})`];
        },
        arg => {
            return ['<i class="bi bi-x"></i> 关闭标签页', `apps.edge.close(${arg})`];
        }
    ]
}
function showcm(e, cl, arg) {
    if ($('#cm').hasClass('show-begin')) {
        setTimeout(() => {
            $('#cm').css('left', e.clientX);
            $('#cm').css('top', e.clientY);
            let h = '';
            cms[cl].forEach(item => {
                if (typeof (item) == 'function') {
                    ret = item(arg);
                    if (ret == 'null') return true;
                    h += `<a class="a" onmousedown="${ret[1]}">${ret[0]}</a>\n`;
                } else if (typeof (item) == 'string') {
                    h += item + '\n';
                } else {
                    h += `<a class="a" onmousedown="${item[1]}">${item[0]}</a>\n`;
                }
            })
            $('#cm>list')[0].innerHTML = h;
            $('#cm').addClass('show-begin');
            $('#cm>.foc').focus();
            setTimeout(() => {
                $('#cm').addClass('show');
            }, 0);
            setTimeout(() => {
                if (e.clientY + $('#cm')[0].offsetHeight > $('html')[0].offsetHeight) {
                    $('#cm').css('top', e.clientY - $('#cm')[0].offsetHeight);
                }
                if (e.clientX + $('#cm')[0].offsetWidth > $('html')[0].offsetWidth) {
                    $('#cm').css('left', $('html')[0].offsetWidth - $('#cm')[0].offsetWidth - 5);
                }
            }, 200);
        }, 200);
        return;
    }
    $('#cm').css('left', e.clientX);
    $('#cm').css('top', e.clientY);
    let h = '';
    cms[cl].forEach(item => {
        if (typeof (item) == 'function') {
            ret = item(arg);
            if (ret == 'null') {
                return true;
            }
            h += `<a class="a" onmousedown="${ret[1]}">${ret[0]}</a>\n`;
        } else if (typeof (item) == 'string') {
            h += item + '\n';
        } else {
            h += `<a class="a" onmousedown="${item[1]}">${item[0]}</a>\n`;
        }
    })
    $('#cm>list')[0].innerHTML = h;
    $('#cm').addClass('show-begin');
    $('#cm>.foc').focus();
    setTimeout(() => {
        $('#cm').addClass('show');
    }, 0);
    setTimeout(() => {
        if (e.clientY + $('#cm')[0].offsetHeight > $('html')[0].offsetHeight) {
            $('#cm').css('top', e.clientY - $('#cm')[0].offsetHeight);
        }
        if (e.clientX + $('#cm')[0].offsetWidth > $('html')[0].offsetWidth) {
            $('#cm').css('left', $('html')[0].offsetWidth - $('#cm')[0].offsetWidth - 5);
        }
    }, 200);
}
$('#cm>.foc').blur(() => {
    let x = event.target.parentNode;
    $(x).removeClass('show');
    setTimeout(() => {
        $(x).removeClass('show-begin');
    }, 200);
});
// 下拉菜单
dps = {
    'notepad.file': [
        ['<i class="bi bi-file-earmark-plus"></i> 新建', `hidedp(true);$('#win-notepad>.text-box').addClass('down');
        setTimeout(()=>{$('#win-notepad>.text-box').val('');$('#win-notepad>.text-box').removeClass('down')},200);`],
        ['<i class="bi bi-box-arrow-right"></i> 另存为', `hidedp(true);$('#win-notepad>.save').attr('href', window.URL.createObjectURL(new Blob([$('#win-notepad>.text-box').html()])));
        $('#win-notepad>.save')[0].click();`],
        '<hr>',
        ['<i class="bi bi-x"></i> 退出', `isOnDp=false;hidedp(true);hidewin('notepad')`],
    ],
    'notepad.edit': [
        ['<i class="bi bi-files"></i> 复制 <info>Ctrl+C</info>', 'document.execCommand(\'copy\')'],
        ['<i class="bi bi-clipboard"></i> 粘贴 <info>Ctrl+V</info>', `document.execCommand(\'paste\')`],
        ['<i class="bi bi-scissors"></i> 剪切 <info>Ctrl+X</info>', 'document.execCommand(\'cut\')'],
        '<hr>',
        ['<i class="bi bi-arrow-return-left"></i> 撤销 <info>Ctrl+Z</info>', 'document.execCommand(\'undo\')'],
        ['<i class="bi bi-arrow-clockwise"></i> 重做 <info>Ctrl+Y</info>', 'document.execCommand(\'redo\')'],
    ],
    'notepad.view': [
        ['<i class="bi bi-type"></i> 插入正常字块', 'hidedp(true);$(\'#win-notepad>.text-box\')[0].innerHTML+=\'<p>T</p>\''],
        ['<i class="bi bi-type-h1"></i> 插入主标题', 'hidedp(true);$(\'#win-notepad>.text-box\')[0].innerHTML+=\'<h1>H1</h1>\''],
        ['<i class="bi bi-type-h2"></i> 插入次标题', 'hidedp(true);$(\'#win-notepad>.text-box\')[0].innerHTML+=\'<h2>H2</h2>\''],
        ['<i class="bi bi-type-h3"></i> 插入副标题', 'hidedp(true);$(\'#win-notepad>.text-box\')[0].innerHTML+=\'<h3>H3</h3>\''],
        ['<i class="bi bi-type-underline"></i> 插入下划线', 'hidedp(true);$(\'#win-notepad>.text-box\')[0].innerHTML+=\'<u>U</u>\''],
        ['<i class="bi bi-type-strikethrough"></i> 插入删除线', 'hidedp(true);$(\'#win-notepad>.text-box\')[0].innerHTML+=\'<s>S</s>\''],
        ['<i class="bi bi-type-italic"></i> 插入斜体字', 'hidedp(true);$(\'#win-notepad>.text-box\')[0].innerHTML+=\'<i>I</i>\''],
        ['<i class="bi bi-type-bold"></i> 插入加粗字', 'hidedp(true);$(\'#win-notepad>.text-box\')[0].innerHTML+=\'<b>B</b>\''],
        '<hr>',
        ['<i class="bi bi-fonts"></i> 字体', 'hidedp(true);showwin(\'notepad-fonts\');resetfonts();'],
    ]
}
let dpt = null, isOnDp = false;
$('#dp')[0].onmouseover = () => { isOnDp = true };
$('#dp')[0].onmouseleave = () => { isOnDp = false; hidedp() };
function showdp(e, cl, arg) {
    if ($('#dp').hasClass('show-begin')) {
        $('#dp').removeClass('show');
        setTimeout(() => {
            $('#dp').removeClass('show-begin');
        }, 200);
        if (e != dpt) {
            setTimeout(() => {
                showdp(e, cl, arg);
            }, 400);
        }
        return;
    }
    // dpt = e;
    let off = $(e).offset();
    $('#dp').css('left', off.left);
    $('#dp').css('top', off.top + e.offsetHeight);
    let h = '';
    dps[cl].forEach(item => {
        if (typeof (item) == 'function') {
            ret = item(arg);
            if (ret == 'null') {
                return true;
            }
            h += `<a class="a" onclick="${ret[1]}">${ret[0]}</a>\n`;
        } else if (typeof (item) == 'string') {
            h += item + '\n';
        } else {
            h += `<a class="a" onclick="${item[1]}">${item[0]}</a>\n`;
        }
    })
    $('#dp>list')[0].innerHTML = h;
    $('#dp').addClass('show-begin');
    setTimeout(() => {
        $('#dp').addClass('show');
    }, 0);
    setTimeout(() => {
        if (off.top + e.offsetHeight + $('#dp')[0].offsetHeight > $('html')[0].offsetHeight) {
            $('#dp').css('top', off.top - $('#dp')[0].offsetHeight);
        }
        if (off.left + $('#dp')[0].offsetWidth > $('html')[0].offsetWidth) {
            $('#dp').css('left', $('html')[0].offsetWidth - $('#dp')[0].offsetWidth - 5);
        }
    }, 200);
}
function hidedp(force = false) {
    setTimeout(() => {
        if (isOnDp && !force) {
            return;
        }
        $('#dp').removeClass('show');
        setTimeout(() => {
            $('#dp').removeClass('show-begin');
        }, 200);
    }, 100);
}
// 悬停提示
document.querySelectorAll('*[win12_title]:not(.notip)').forEach(a => {
    a.addEventListener('mouseenter', showdescp);
    a.addEventListener('mouseleave', hidedescp);
})
function showdescp(e) {
    $(e.target).attr('data-descp', 'waiting');
    setTimeout(() => {
        if ($(e.target).attr('data-descp') == 'hide') {
            return;
        }
        $(e.target).attr('data-descp', 'show');
        $('#descp').css('left', e.clientX + 15);
        $('#descp').css('top', e.clientY + 20);
        $('#descp').text($(e.target).attr('win12_title'));
        $('#descp').addClass('show-begin');
        setTimeout(() => {
            if (e.clientY + $('#descp')[0].offsetHeight + 20 >= $('html')[0].offsetHeight) {
                $('#descp').css('top', e.clientY - $('#descp')[0].offsetHeight - 10);
            }
            if (e.clientX + $('#descp')[0].offsetWidth + 15 >= $('html')[0].offsetWidth) {
                $('#descp').css('left', e.clientX - $('#descp')[0].offsetWidth - 10);
            }
            $('#descp').addClass('show');
        }, 100);
    }, 500);
}
function hidedescp(e) {
    $('#descp').removeClass('show');
    $(e.target).attr('data-descp', 'hide');
    setTimeout(() => {
        $('#descp').removeClass('show-begin');
    }, 100);
}
// 应用
let apps = {
    setting: {
        init: () => {
            $('#win-setting>.menu>list>a.system')[0].click();
            // let _=$('#win-setting>.menu>list>span.focs'),
            //     la=$('#win-setting>.menu>list>a.system')[0],
            //     li=$('#win-setting>.menu>list')[0];
            // console.log(la.offsetTop,li.offsetTop,li.offsetHeight);
            // _.addClass('cl');
            // _.css('top',la.offsetTop-li.offsetTop-li.offsetHeight);
            // _.css('left',la.offsetLeft-li.offsetLeft);
        },
        page: (name) => {
            $('#win-setting>.page>.cnt.' + name).scrollTop(0);
            $('#win-setting>.page>.cnt.show').removeClass('show');
            $('#win-setting>.page>.cnt.' + name).addClass('show');
            $('#win-setting>.menu>list>a.check').removeClass('check');
            $('#win-setting>.menu>list>a.' + name).addClass('check');
        }
    },
    explorer: {
        init: () => {
            apps.explorer.reset();
        },
        reset: () => {
            $('#win-explorer>.main>.content>.view')[0].innerHTML = `<style>#win-explorer>.main>.content>.view>.class{margin-left: 20px;display: flex;}
            #win-explorer>.main>.content>.view>.class>img{width: 20px;height: 20px;margin-top: 3px;margin-right: 5px;filter:brightness(0.9);}
            #win-explorer>.main>.content>.view>.group{display: flex;flex-wrap: wrap;padding: 10px 20px;}
            #win-explorer>.main>.content>.view>.group>.item{width: 280px;margin: 5px;height:80px;border: 1px solid #6f6f6f30;
                background: radial-gradient(circle, var(--card),var(--card));border-radius: 10px;display: flex;}
            #win-explorer>.main>.content>.view>.group>.item:hover{background-color: var(--hover);}
            #win-explorer>.main>.content>.view>.group>.item:active{transform: scale(0.97);}
            #win-explorer>.main>.content>.view>.group>.item>img{width: 55px;height: 55px;margin-top: 18px;margin-left: 10px;}
            #win-explorer>.main>.content>.view>.group>.item>div{flex-grow: 1;padding: 5px 5px 0 0;}
            #win-explorer>.main>.content>.view>.group>.item>div>.bar{width: calc(100% - 10px);height: 8px;border-radius: 10px;
                background-color: var(--hover-b);margin: 5px 5px;}
            #win-explorer>.main>.content>.view>.group>.item>div>.bar>.content{height: 100%;background-image: linear-gradient(90deg, var(--theme-1), var(--theme-2));
                border-radius: 10px;}
            #win-explorer>.main>.content>.view>.group>.item>div>.info{color: #959595;font-size: 14px;}</style>
            <p class="class"><img src="apps/icons/explorer/disk.png"> 设备和驱动器</p><div class="group">
            <a class="a item act" ondblclick="apps.explorer.goto('C:')" ontouchend="apps.explorer.goto('C:')" oncontextmenu="showcm(event,'explorer.folder','C:');return stop(event);">
            <img src="apps/icons/explorer/diskwin.png"><div><p class="name">本地磁盘 (C:)</p>
            <div class="bar"><div class="content" style="width: 88%;"></div>
            </div><p class="info">32.6 GB 可用, 共 143 GB</p></div></a><a class="a item act" ondblclick="apps.explorer.goto('D:')" ontouchend="apps.explorer.goto('D:')"
            oncontextmenu="showcm(event,'explorer.folder','D:');return stop(event);">
            <img src="apps/icons/explorer/disk.png"><div><p class="name">本地磁盘 (D:)</p><div class="bar"><div class="content" style="width: 15%;"></div>
            </div><p class="info">185.3 GB 可用, 共 216 GB</p></div></a></div>`;
            $('#win-explorer>.main>.content>.tool>.tit')[0].innerHTML = '此电脑';
        },
        goto: (path) => {
            $('#win-explorer>.main>.content>.view')[0].innerHTML = '';
            pathl = path.split('/');
            let tmp = apps.explorer.path;
            pathl.forEach(name => {
                tmp = tmp['folder'][name];
            });
            if (tmp == null) {
                $('#win-explorer>.main>.content>.view')[0].innerHTML = '<p class="info">此文件夹为空。</p>';
            } else {
                let ht = '';
                for (folder in tmp['folder']) {
                    ht += `<a class="a item act" ondblclick="apps.explorer.goto('${path}/${folder}')" ontouchend="apps.explorer.goto('${path}/${folder}')" oncontextmenu="showcm(event,'explorer.folder','${path}/${folder}');return stop(event);">
                        <img src="apps/icons/explorer/folder.png">${folder}</a>`;
                }
                if (tmp['file']) {
                    tmp['file'].forEach(file => {
                        ht += `<a class="a item act file" ondblclick="${file['command']}" ontouchend="${file['command']}" oncontextmenu="return stop(event);">
                            <img src="${file['ico']}">${file['name']}</a>`;
                    });
                }
                $('#win-explorer>.main>.content>.view')[0].innerHTML = ht;
            }
            if (pathl.length == 1) {
                $('#win-explorer>.main>.content>.tool>.goback').attr('onclick', 'apps.explorer.reset()');
            } else {
                $('#win-explorer>.main>.content>.tool>.goback').attr('onclick', `apps.explorer.goto('${path.substring(0, path.length - pathl[pathl.length - 1].length - 1)}')`);
            }
            $('#win-explorer>.main>.content>.tool>.tit')[0].innerHTML = path;
        },
        path: {
            folder: {
                'C:': {
                    folder: {
                        'Program Files': {
                            folder: { 'WindowsApps': null, 'Microsoft': null },
                            file: [
                                { name: 'about.exe', ico: 'icon/about.png', command: "openapp('about')" },
                                { name: 'setting.exe', ico: 'icon/setting.png', command: "openapp('setting')" },
                            ]
                        },
                        'Windows': {
                            folder: { 'Boot': null, 'System': null, 'System32': null },
                            file: [
                                { name: 'notepad.exe', ico: 'icon/notepad.png', command: "openapp('notepad')" },
                            ]
                        },
                        '用户': {
                            folder: {
                                'Administrator': {
                                    folder: {
                                        '文档': {
                                            folder: { 'IISExpress': null, 'PowerToys': null },
                                            file: [
                                                { name: '瓶盖介绍.doc', ico: 'icon/files/word.png', command: '' },
                                                { name: '瓶盖质量统计分析.xlsx', ico: 'icon/files/excel.png', command: '' },
                                            ]
                                        }, '图片': {
                                            folder: { '本机照片': null, '屏幕截图': null },
                                            file: [
                                                { name: '瓶盖构造图.png', ico: 'icon/files/img.png', command: '' },
                                                { name: '可口可乐瓶盖.jpg', ico: 'icon/files/img.png', command: '' },
                                            ]
                                        },
                                        'AppData': null, '音乐': { folder: { '录音机': null } }
                                    }
                                }
                            }
                        }
                    }
                },
                'D:': {
                    folder: { 'Microsoft': null },
                    file: [
                        { name: '瓶盖结构说明.docx', ico: 'icon/files/word.png', command: '' },
                        { name: '可口可乐瓶盖历史.pptx', ico: 'icon/files/ppt.png', command: '' },
                    ]
                }
            }
        }
    },
    calc: {
        init: () => {
            $('#calc-input').val('');
        },
        add: (arg) => {
            $('#calc-input')[0].value += arg;
        }
    },
    about: {
        init: () => {
            $('#win-about>.about').addClass('show');
            $('#win-about>.update').removeClass('show');
            if ($('#contri').length > 1) return;
            apps.about.get();
        },
        get: () => {
            $('#contri').html(`<loading><svg width="30px" height="30px" viewBox="0 0 16 16">
            <circle cx="8px" cy="8px" r="7px" style="stroke:#7f7f7f50;fill:none;stroke-width:3px;"></circle>
            <circle cx="8px" cy="8px" r="7px" style="stroke:#2983cc;stroke-width:3px;"></circle></svg></loading>`)
            // 实时获取项目贡献者
            $.get('https://api.github.com/repos/tjy-gitnub/win12/contributors').then(cs => {
                setTimeout(() => {
                    $('#contri').html('');
                    cs.forEach(c => {
                        $('#contri').append(`<a class="a" onclick="window.open('${c['html_url']}','_blank');"><p class="name">${c['login']}</p><p class="cbs">贡献:<span class="num">${c['contributions']}</span></p></a>`)
                    });
                    $('#contri').append(`<a class="button" onclick="apps.about.get()"><i class="bi bi-arrow-clockwise"></i> 刷新</a>`)
                }, 200);
            });
        }
    },
    notepad: {
        init: () => {
            $('#win-notepad>.text-box').addClass('down');
            setTimeout(() => {
                $('#win-notepad>.text-box').val('');
                $('#win-notepad>.text-box').removeClass('down')
            }, 200);
        }
    },
    terminal: {
        init: () => {
            $('#win-terminal>pre').html(`Micrsotft Windosw [版本 12.0.39035.7324]
(c) Micrsotft Corparotoin。保所留有权利。
一个摆设，后续不会完善。

C:\Windows\System32> <input type="text" oninput="setTimeout(() => {$('#win-terminal>pre')[0].innerHTML+=this.outerHTML;$('#win-terminal>pre>input').focus()}, 0);$('#win-terminal>pre')[0].innerText+=$(this).val();">`)
        }
    },
    search: {
        rand: [{ name: '农夫山泉瓶盖简介.txt', bi: 'text', ty: '文本文档' },
        { name: '瓶盖构造图.png', bi: 'image', ty: 'PNG 文件' },
        { name: '瓶盖结构说明.docx', bi: 'richtext', ty: 'Microsoft Word 文档' },
        { name: '可口可乐瓶盖.jpg', bi: 'image', ty: 'JPG 文件' },
        { name: '可口可乐瓶盖历史.pptx', bi: 'slides', ty: 'Microsoft Powerpoint 演示文稿' },
        { name: '瓶盖质量统计分析.xlsx', bi: 'ruled', ty: 'Microsoft Excel 工作表' },
        { name: '农夫山泉瓶盖.svg', bi: 'image', ty: 'SVG 文件' },
        { name: '瓶盖介绍.doc', bi: 'richtext', ty: 'Microsoft Word 文档' }],
        search: le => {
            if (le > 0) {
                $('#search-win>.ans>.list>list').html(
                    `<a class="a" onclick="apps.search.showdetail(${le % 8})"><i class="bi bi-file-earmark-${apps.search.rand[le % 8].bi}"></i> ${apps.search.rand[le % 8].name
                    }</a><a class="a" onclick="apps.search.showdetail(${(le + 3) % 8})"><i class="bi bi-file-earmark-${apps.search.rand[(le + 3) % 8].bi}"></i> ${apps.search.rand[(le + 3) % 8].name}</a>`);
                apps.search.showdetail(le % 8);
            } else {
                $('#search-win>.ans>.list>list').html(
                    `<p class="text">推荐</p>
					<a onclick="openapp('setting');$('#search-btn').removeClass('show');
					$('#search-win').removeClass('show');
					setTimeout(() => {
						$('#search-win').removeClass('show-begin');
					}, 200);">
						<img src="icon/setting.png"><p>设置</p></a>
					<a onclick="openapp('about');$('#search-btn').removeClass('show');
					$('#search-win').removeClass('show');
					setTimeout(() => {
						$('#search-win').removeClass('show-begin');
					}, 200);">
						<img src="icon/about.png"><p>关于Win12网页版</p></a>`);
                $('#search-win>.ans>.view').removeClass('show');
            }
        },
        showdetail: i => {
            $('#search-win>.ans>.view').addClass('show');
            let inf = apps.search.rand[i];
            $('#search-win>.ans>.view>.fname>.bi').attr('class', 'bi bi-file-earmark-' + inf.bi);
            $('#search-win>.ans>.view>.fname>.name').text(inf.name);
            $('#search-win>.ans>.view>.fname>.type').text(inf.ty);
        }
    },
    edge: {
        init: () => {
            $('#win-edge>iframe').remove();
            apps.edge.tabs = [];
            apps.edge.len = 0;
            apps.edge.newtab();
        },
        tabs: [],
        now: null,
        len: 0,
        newtab: () => {
            apps.edge.tabs.push([apps.edge.len++, '新建标签页']);
            $('#win-edge').append(`<iframe src="mainpage.html" frameborder="0" class="${apps.edge.tabs[apps.edge.tabs.length - 1][0]}">`)
            apps.edge.settabs();
            apps.edge.tab(apps.edge.tabs.length - 1);
            $('#win-edge>.tool>input.url').focus();
            document.querySelectorAll("#win-edge > iframe")[apps.edge.tabs.length - 1].onload = function () {
                this.contentDocument.querySelector('input').onkeyup = function (e) {
                    if (e.keyCode == 13 && $(this).val() != '') {
                        apps.edge.goto($(this).val())
                    }
                }
            }
        },
        settabs: () => {
            $('.window.edge>.titbar>.tabs')[0].innerHTML = '';
            for (let i = 0; i < apps.edge.tabs.length; i++) {
                const t = apps.edge.tabs[i];
                $('.window.edge>.titbar>.tabs')[0].innerHTML += `<div class="tab ${t[0]}" onclick="apps.edge.tab(${i})" oncontextmenu="showcm(event,'edge.tab',${i});stop(event);return false"><p>${t[1]}</p><span class="clbtn bi bi-x" onclick="apps.edge.close(${i})"></span></div>`;
            }
            $('.window.edge>.titbar>.tabs')[0].innerHTML += '<a class="new bi bi-plus" onclick="apps.edge.newtab();"></a>';
            // $('.window.edge>.titbar>.tabs>.tab.'+apps.edge.tabs[apps.edge.now][0]).addClass('show');

        },
        close: c => {
            $('.window.edge>.titbar>.tabs>.tab.' + apps.edge.tabs[c][0]).addClass('close');
            for (let i = c + 1; i < apps.edge.tabs.length; i++) {
                const _id = apps.edge.tabs[i][0];
                $('.window.edge>.titbar>.tabs>.tab.' + _id).addClass('left');
            }
            setTimeout(() => {
                $('#win-edge>iframe.' + apps.edge.tabs[c][0]).remove();
                apps.edge.tabs.splice(c, 1);
                apps.edge.settabs();
                if (apps.edge.tabs.length == 0) {
                    hidewin('edge');
                }
                apps.edge.tab(apps.edge.tabs.length - 1);
            }, 200);
        },
        tab: c => {
            console.log(c, apps.edge.tabs[c][0])
            $('#win-edge>iframe.show').removeClass('show');
            $('#win-edge>iframe.' + apps.edge.tabs[c][0]).addClass('show');
            $('#win-edge>.tool>input.url').val($('#win-edge>iframe.' + apps.edge.tabs[c][0]).attr('src') == 'mainpage.html' ? '' : $('#win-edge>iframe.' + apps.edge.tabs[c][0]).attr('src'));
            $('#win-edge>.tool>input.rename').removeClass('show');
            apps.edge.now = c;
            $('.window.edge>.titbar>.tabs>.tab.show').removeClass('show');
            $('.window.edge>.titbar>.tabs>.tab.' + apps.edge.tabs[c][0]).addClass('show');
        },
        c_rename: c => {
            apps.edge.tab(c);
            $('#win-edge>.tool>input.rename').val(apps.edge.tabs[apps.edge.now][1]);
            $('#win-edge>.tool>input.rename').addClass('show');
            setTimeout(() => {
                $('#win-edge>.tool>input.rename').focus();
            }, 300);
        },
        rename: n => {
            apps.edge.tabs[apps.edge.now][1] = n;
            apps.edge.settabs();
            apps.edge.tab(apps.edge.now);
        },
        goto: u => {
            // 6
            if (!/^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(u)) {
                // 启用必应搜索
                $('#win-edge>iframe.show').attr('src', 'https://bing.com/search?q=' + u);
                apps.edge.rename(u);
            }
            // 检测网址是否带有http头
            else if (!/^https?:\/\//.test(u)) {
                $('#win-edge>iframe.show').attr('src', 'http://' + u);
                apps.edge.rename('http://' + u);
            }
            else {
                $('#win-edge>iframe.show').attr('src', u);
                apps.edge.rename(u);
            }
        }
    },
}

// 小组件
let widgets = {
    widgets: {
        add: (arg) => {
            if ($('#widgets>.widgets>.content>.grid>.wg.' + arg).length != 0) {
                return;
            }
            $('#widgets>.widgets>.content>.grid')[0].innerHTML += $('#widgets>.widgets>.content>.template>.' + arg).html();
        },
        remove: (arg) => {
            $('#widgets>.widgets>.content>.grid>.wg.' + arg).remove();
        }
    },
    calc: {
        add: (arg) => {
            $('*:not(.template)>*>.wg.calc>.content>input')[0].value += arg;
        }
    }
}
// 日期、时间
let da = new Date();
let date = `星期${['日', '一', '二', '三', '四', '五', '六'][da.getDay()]}, ${da.getFullYear()}年${(da.getMonth() + 1).toString().padStart(2, '0')}月${da.getDate().toString().padStart(2, '0')}日`
$('#s-m-r>.row1>.tool>.date').text(date);
$('.dock.date>.date').text(`${da.getFullYear()}/${(da.getMonth() + 1).toString().padStart(2, '0')}/${da.getDate().toString().padStart(2, '0')}`);
$('#datebox>.tit>.date').text(date);
function loadtime() {
    let d = new Date();
    let time = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`
    $('#s-m-r>.row1>.tool>.time').text(time);
    $('.dock.date>.time').text(time);
    $('#datebox>.tit>.time').text(time);
}
setInterval(loadtime, 1000);
let d = new Date();
let today = new Date().getDate();
let start = 7 - ((d.getDate() - d.getDay()) % 7) + 1;
let daysum = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
for (let i = 1; i < start; i++) {
    $('#datebox>.cont>.body')[0].innerHTML += '<span></span>';
}
for (let i = 1; i <= daysum; i++) {
    if (i == today) {
        $('#datebox>.cont>.body')[0].innerHTML += `<p class="today">${i}</p>`;
        continue;
    }
    $('#datebox>.cont>.body')[0].innerHTML += `<p>${i}</p>`;
}
function openapp(name) {
    if ($('#taskbar>.' + name).length != 0) {
        if ($('.window.' + name).hasClass('min')) {
            minwin(name);
        }
        focwin(name);
        return;
    }
    $('.window.' + name).addClass('load');
    showwin(name);
    $('#taskbar').attr('count', Number($('#taskbar').attr('count')) + 1);
    $('#taskbar').append(`<a class="${name}" onclick="taskbarclick(\'${name}\')" win12_title="${$(`.window.${name}>.titbar>p`).text()}" onmouseenter="showdescp(event)" onmouseleave="hidedescp(event)"><img src="icon/${name}.png"></a>`);
    if ($('#taskbar').attr('count') == '1') {
        $('#taskbar').css('display', 'flex');
    }
    $('#taskbar>.' + name).addClass('foc');
    setTimeout(() => {
        $('#taskbar').css('width', 4 + $('#taskbar').attr('count') * (34 + 4));
    }, 0);
    apps[name].init();
    setTimeout(() => {
        $('.window.' + name).removeClass('load');
    }, 500);
}
// 窗口操作
function showwin(name) {
    $('.window.' + name).addClass('show-begin');
    setTimeout(() => { $('.window.' + name).addClass('show'); }, 0);
    setTimeout(() => { $('.window.' + name).addClass('notrans'); }, 200);
    $('.window.' + name).attr('style', `top: 10%;left: 15%;`);
    $('#taskbar>.' + wo[0]).removeClass('foc');
    $('.window.' + wo[0]).removeClass('foc');
    wo.splice(0, 0, name);
    orderwindow();
    $('.window.' + name).addClass('foc');
}
function hidewin(name, arg = 'window') {
    $('.window.' + name).removeClass('notrans');
    $('.window.' + name).removeClass('max');
    $('.window.' + name).removeClass('show');
    if (arg == 'window') {
        $('#taskbar').attr('count', Number($('#taskbar').attr('count')) - 1)
        $('#taskbar>.' + name).remove();
        $('#taskbar').css('width', 4 + $('#taskbar').attr('count') * (34 + 4));
        setTimeout(() => {
            if ($('#taskbar').attr('count') == '0') {
                $('#taskbar').css('display', 'none');
            }
        }, 80);
    }
    setTimeout(() => { $('.window.' + name).removeClass('show-begin'); }, 200);
    $('.window.' + name + '>.titbar>div>.wbtg.max').html('<i class="bi bi-app"></i>');
    wo.splice(wo.indexOf('name'), 1);
    orderwindow();
}
function maxwin(name, trigger = true) {
    if ($('.window.' + name).hasClass('max')) {
        $('.window.' + name).removeClass('left');
        $('.window.' + name).removeClass('right');
        $('.window.' + name).removeClass('max');
        $('.window.' + name + '>.titbar>div>.wbtg.max').html('<i class="bi bi-app"></i>');
        if (trigger) {
            setTimeout(() => { $('.window.' + name).addClass('notrans'); }, 200);
        } else if (!trigger) {
            $('.window.' + name).addClass('notrans');
        }
        if ($('.window.' + name).attr('data-pos-x') != 'null' && $('.window.' + name).attr('data-pos-y') != 'null') {
            $('.window.' + name).attr(`style`, `left:${$('.window.' + name).attr('data-pos-x')};top:${$('.window.' + name).attr('data-pos-y')}`);
        }
        // }
    } else {
        if (trigger) {
            $('.window.' + name).attr('data-pos-x', `${$('.window.' + name).css('left')}`);
            $('.window.' + name).attr('data-pos-y', `${$('.window.' + name).css('top')}`);
        }
        $('.window.' + name).removeClass('notrans');
        $('.window.' + name).addClass('max');
        $('.window.' + name + '>.titbar>div>.wbtg.max').html('<svg version="1.1" width="12" height="12" viewBox="0,0,37.65105,35.84556" style="margin-top:4px;"><g transform="translate(-221.17804,-161.33903)"><g style="stroke:var(--text);" data-paper-data="{&quot;isPaintingLayer&quot;:true}" fill="none" fill-rule="nonzero" stroke-width="2" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" style="mix-blend-mode: normal"><path d="M224.68734,195.6846c-2.07955,-2.10903 -2.00902,-6.3576 -2.00902,-6.3576l0,-13.72831c0,0 -0.23986,-1.64534 2.00902,-4.69202c1.97975,-2.68208 4.91067,-2.00902 4.91067,-2.00902h14.06315c0,0 3.77086,-0.23314 5.80411,1.67418c2.03325,1.90732 1.33935,5.02685 1.33935,5.02685v13.39347c0,0 0.74377,4.01543 -1.33935,6.3576c-2.08312,2.34217 -5.80411,1.67418 -5.80411,1.67418h-13.39347c0,0 -3.50079,0.76968 -5.58035,-1.33935z"/><path d="M229.7952,162.85325h16.06111c0,0 5.96092,-0.36854 9.17505,2.64653c3.21412,3.01506 2.11723,7.94638 2.11723,7.94638v18.55642"/></g></g></svg>')
    }
}
function minwin(name) {
    if ($('.window.' + name).hasClass('min')) {
        $('.window.' + name).addClass('show-begin');
        focwin(name);
        setTimeout(() => {
            $('#taskbar>.' + name).removeClass('min');
            $('.window.' + name).removeClass('min');
            if ($('.window.' + name).hasClass('min-max')) {
                $('.window.' + name).addClass('max');
            }
            $('.window.' + name).removeClass('min-max');
        }, 0);
        setTimeout(() => {
            if (!$('.window.' + name).hasClass('max')) {
                $('.window.' + name).addClass('notrans');
            }
        }, 200);
    } else {
        focwin(null);
        if ($('.window.' + name).hasClass('max')) {
            $('.window.' + name).addClass('min-max');
        }
        $('.window.' + name).removeClass('foc');
        $('.window.' + name).removeClass('max');
        $('#taskbar>.' + name).addClass('min');
        $('.window.' + name).addClass('min');
        $('.window.' + name).removeClass('notrans');
        setTimeout(() => { $('.window.' + name).removeClass('show-begin'); }, 200);
    }
}
let wo = [];
function orderwindow() {
    for (let i = 0; i < wo.length; i++) {
        const win = $('.window.' + wo[wo.length - i - 1]);
        win.css('z-index', 10 + i);
    }
}
// 以下函数基于bug运行，切勿改动！
function focwin(name, arg = 'window') {
    // if(wo[0]==name)return;
    if (arg == 'window') {
        $('#taskbar>.' + wo[0]).removeClass('foc');
        $('#taskbar>.' + name).addClass('foc');
    }
    $('.window.' + wo[0]).removeClass('foc');
    wo.splice(wo.indexOf(name), 1);
    wo.splice(0, 0, name);
    orderwindow();
    $('.window.' + name).addClass('foc');
}
function taskbarclick(name) {
    if ($('.window.' + name).hasClass('foc')) {
        minwin(name);
        focwin(null); // 禁改
        return;
    }
    if ($('.window.' + name).hasClass('min')) {
        minwin(name);
    }
    focwin(name);
}
// 菜单隐藏
function hide_startmenu() {
    $('#start-menu').removeClass('show');
    $('#start-btn').removeClass('show');
    setTimeout(() => { $('#start-menu').removeClass('show-begin'); }, 200);
}
function hide_widgets() {
    $('#widgets').removeClass('show');
    $('#widgets-btn').removeClass('show');
    setTimeout(() => { $('#widgets').removeClass('show-begin'); }, 200);
}
// 选择框
let chstX, chstY;
function ch(e) {
    $('#desktop>.choose').css('left', Math.min(chstX, e.clientX));
    $('#desktop>.choose').css('width', Math.abs(e.clientX - chstX));
    $('#desktop>.choose').css('top', Math.min(chstY, e.clientY));
    $('#desktop>.choose').css('height', Math.abs(e.clientY - chstY));
}
$('#desktop')[0].addEventListener('mousedown', e => {
    chstX = e.clientX;
    chstY = e.clientY;
    this.onmousemove = ch;
})
$('#desktop')[0].addEventListener('mouseup', e => {
    this.onmousemove = null;
    $('#desktop>.choose').css('left', 0);
    $('#desktop>.choose').css('top', 0);
    $('#desktop>.choose').css('width', 0);
    $('#desktop>.choose').css('height', 0);
})
// 主题
function toggletheme() {
    $('.dock.theme').toggleClass('dk');
    $(':root').toggleClass('dark');
    if ($(':root').hasClass('dark')) {
        setData('theme', 'dark');
    } else {
        setData('theme', 'light');
    }
}
// 拖拽窗口
const page = document.getElementsByTagName('html')[0];
const titbars = document.querySelectorAll('.window>.titbar');
const wins = document.querySelectorAll('.window');
let deltaLeft = 0, deltaTop = 0, fil = false, filty = 'none', bfLeft = 0, bfTop = 0;
for (let i = 0; i < wins.length; i++) {
    const win = wins[i];
    const titbar = titbars[i];
    function win_move(e) {
        let cx, cy;
        if (e.type == 'touchmove') {
            cx = e.targetTouches[0].clientX, cy = e.targetTouches[0].clientY;
        } else {
            cx = e.clientX, cy = e.clientY;
        }
        this.setAttribute('style', `left:${cx - deltaLeft}px;top:${cy - deltaTop}px;`);
        if (cy <= 0) {
            this.setAttribute('style', `left:${cx - deltaLeft}px;top:${-deltaTop}px`);
            if (this.classList[1] != 'calc' && this.classList[1] != 'notepad-fonts') {
                $('#window-fill').addClass('top');
                setTimeout(() => {
                    $('#window-fill').addClass('fill');
                }, 0);
                fil = this;
                filty = 'top';
            }
        } else if (cx <= 0) {
            this.setAttribute('style', `left:${-deltaLeft}px;top:${cy - deltaTop}px`);
            if (this.classList[1] != 'calc' && this.classList[1] != 'notepad-fonts') {
                $('#window-fill').addClass('left');
                setTimeout(() => {
                    $('#window-fill').addClass('fill');
                }, 0);
                fil = this;
                filty = 'left';
            }
        } else if (cx >= document.body.offsetWidth - 2) {
            this.setAttribute('style', `left:calc(100% - ${deltaLeft}px);top:${cy - deltaTop}px`);
            if (this.classList[1] != 'calc' && this.classList[1] != 'notepad-fonts') {
                $('#window-fill').addClass('right');
                setTimeout(() => {
                    $('#window-fill').addClass('fill');
                }, 0);
                fil = this;
                filty = 'right';
            }
        } else if (fil) {
            $('#window-fill').removeClass('fill');
            setTimeout(() => {
                $('#window-fill').removeClass('top');
                $('#window-fill').removeClass('left');
                $('#window-fill').removeClass('right');
            }, 200);
            fil = false;
            filty = 'none';
        } else if ($(this).hasClass('max')) {
            deltaLeft = deltaLeft / (this.offsetWidth - (45 * 3)) * ((0.7 * document.body.offsetWidth) - (45 * 3));
            maxwin(this.classList[1], false);
            // 窗口控制按钮宽 45px
            this.setAttribute('style', `left:${cx - deltaLeft}px;top:${cy - deltaTop}px;`);
            $('.window.' + this.classList[1] + '>.titbar>div>.wbtg.max').html('<i class="bi bi-app"></i>');

            $(this).addClass('notrans');
        }
    }
    titbar.addEventListener('mousedown', (e) => {
        let x = window.getComputedStyle(win, null).getPropertyValue('left').split("px")[0];
        let y = window.getComputedStyle(win, null).getPropertyValue('top').split("px")[0];
        if (y != 0) {
            bfLeft = x;
            bfTop = y;
        }
        deltaLeft = e.clientX - x;
        deltaTop = e.clientY - y;
        page.onmousemove = win_move.bind(win);
    })
    titbar.addEventListener('touchstart', (e) => {
        let x = window.getComputedStyle(win, null).getPropertyValue('left').split("px")[0];
        let y = window.getComputedStyle(win, null).getPropertyValue('top').split("px")[0];
        if (y != 0) {
            bfLeft = x;
            bfTop = y;
        }
        deltaLeft = e.targetTouches[0].clientX - x;
        deltaTop = e.targetTouches[0].clientY - y;
        page.ontouchmove = win_move.bind(win);
    })
}
page.addEventListener('mouseup', () => {
    page.onmousemove = null;
    if (fil) {
        if (filty == 'top')
            maxwin(fil.classList[1], false);
        else if (filty == 'left') {
            maxwin(fil.classList[1], false);
            $(fil).addClass('left');
        } else if (filty == 'right') {
            maxwin(fil.classList[1], false);
            $(fil).addClass('right');
        }
        setTimeout(() => {
            $('#window-fill').removeClass('fill');
            $('#window-fill').removeClass('top');
            $('#window-fill').removeClass('left');
            $('#window-fill').removeClass('right');
        }, 200);
        $('.window.' + fil.classList[1]).attr('data-pos-x', `${bfLeft}px`);
        $('.window.' + fil.classList[1]).attr('data-pos-y', `${bfTop}px`);
        fil = false;
    }
});
page.addEventListener('touchend', () => {
    page.ontouchmove = null;
    if (fil) {
        if (filty == 'top')
            maxwin(fil.classList[1], false);
        else if (filty == 'left') {
            maxwin(fil.classList[1], false);
            $(fil).addClass('left');
        } else if (filty == 'right') {
            maxwin(fil.classList[1], false);
            $(fil).addClass('right');
        }
        setTimeout(() => {
            $('#window-fill').removeClass('fill');
            $('#window-fill').removeClass('top');
            $('#window-fill').removeClass('left');
            $('#window-fill').removeClass('right');
        }, 200);
        setTimeout(() => {
            $('.window.' + fil.classList[1]).attr('data-pos-x', `${bfLeft}px`);
            $('.window.' + fil.classList[1]).attr('data-pos-y', `${bfTop}px`);
        }, 200);
        fil.setAttribute('style', `left:${bfLeft}px;top:${bfTop}px`);
        fil = false;
    }
});
// 记事本选择字体
const sizes = {
    '初号': '56',
    '小初': '48',
    '一号': '34.7',
    '小一': '32',
    '二号': '29.3',
    '小二': '24',
    '三号': '21.3',
    '小三': '20',
    '四号': '18.7',
    '小四': '16',
    '五号': '14',
    '小五': '12'
};
const styles = {
    '正常': '',
    '粗体': 'font-weight: bold;',
    '斜体': 'font-style: italic;',
    '粗偏斜体': 'font-weight: bold; font-style: italic;'
}
const fontvalues = document.querySelectorAll('#win-notepad-font>.row>#win-notepad-font-type>.value-box>.option');
const sizevalues = document.querySelectorAll('#win-notepad-font>.row>#win-notepad-font-size>.value-box>.option');
const stylevalues = document.querySelectorAll('#win-notepad-font>.row>#win-notepad-font-style>.value-box>.option');
const typeinput = document.querySelector('#win-notepad-font>.row>#win-notepad-font-type>input[type=text]');
const sizeinput = document.querySelector('#win-notepad-font>.row>#win-notepad-font-size>input[type=text]');
const styleinput = document.querySelector('#win-notepad-font>.row>#win-notepad-font-style>input[type=text]');
for (const elt of fontvalues) {
    elt.onclick = function () {
        typeinput.value = this.innerText;
        preview();
    }
    elt.setAttribute('style', `font-family: ${elt.innerText};`)
}
for (const elt of sizevalues) {
    elt.onclick = function () {
        sizeinput.value = this.innerText;
        preview();
    }
}
for (const elt of stylevalues) {
    elt.onclick = function () {
        styleinput.value = this.innerText;
        preview();
    }
    elt.setAttribute('style', styles[elt.innerText]);
}
sizeinput.addEventListener("keyup", preview);
typeinput.addEventListener("keyup", preview);
function commitFont() {
    var fontsize = 0;
    var fontstyle;
    if (!sizeinput.value.match(/^[0-9]*$/)) {
        if (sizes[sizeinput.value] != undefined) {
            fontsize = sizes[sizeinput.value];
        }
    } else if (sizeinput.value.match(/^[0-9]*$/)) {
        fontsize = sizeinput.value;
    }
    if (fontsize <= 0) {
        fontsize = 15;
    }
    if (styles[styleinput.value] != undefined) {
        fontstyle = styles[styleinput.value];
    } else if (styles[styleinput.value] == undefined) {
        fontstyle = styles['正常'];
    }
    if (styles[styleinput.value] != undefined) {
        fontstyle = styles[styleinput.value];
    } else if (styles[styleinput.value] == undefined) {
        fontstyle = styles['正常'];
    }
    $('.notepad>#win-notepad>.text-box').attr('style', `font-family: ${typeinput.value} !important; font-size: ${fontsize}px !important; ${fontstyle}`);
    hidewin('notepad-fonts', 'configs');
}
function resetfonts() {
    typeinput.value = window.getComputedStyle($('.notepad>#win-notepad>.text-box')[0], null).getPropertyValue('font-family').split(', ')[0];
    var fontsize = window.getComputedStyle($('.notepad>#win-notepad>.text-box')[0], null).getPropertyValue('font-size').split('px')[0];
    var fontweight = window.getComputedStyle($('.notepad>#win-notepad>.text-box')[0], null).getPropertyValue('font-weight');
    var fontstyle = window.getComputedStyle($('.notepad>#win-notepad>.text-box')[0], null).getPropertyValue('font-style');
    if (fontweight == '700' && fontstyle == 'normal') {
        styleinput.value = '粗体';
    } else if (fontweight == '400' && fontstyle == 'italic') {
        styleinput.value = '斜体';
    } else if (fontweight == '700' && fontstyle == 'italic') {
        styleinput.value = '粗偏斜体';
    } else if (fontweight == '400' && fontstyle == 'normal') {
        styleinput.value = '正常';
    }
    for (const [key, value] of Object.entries(sizes)) {
        if (value == fontsize) {
            fontsize = key;
            break;
        }
    }
    sizeinput.value = fontsize;
}
function preview() {
    var fontsize = 0;
    var fontstyle;
    if (!sizeinput.value.match(/^[0-9]*$/)) {
        if (sizes[sizeinput.value] != undefined) {
            fontsize = sizes[sizeinput.value];
        }
    } else if (sizeinput.value.match(/^[0-9]*$/)) {
        fontsize = sizeinput.value;
    }
    if (styles[styleinput.value] != undefined) {
        fontstyle = styles[styleinput.value];
    } else if (styles[styleinput.value] == undefined) {
        fontstyle = styles['正常'];
    }
    $('#win-notepad-font>.preview>.preview-box').attr('style', `font-family: ${typeinput.value} !important; font-size: ${fontsize}px !important;${fontstyle}`);
}

// 启动
let updated = false;
document.getElementsByTagName('body')[0].onload = function nupd() {
    $('#loadback').addClass('hide'); setTimeout(() => { $('#loadback').css('display', 'none') }, 200);
    if (updated) {
        setTimeout(() => {
            $('.msg.update').addClass('show');
        }, 1000);
    }
};

// 离线应用
function setData(k, v) {
    $.get(`/setdata/${k}/${v}`).then(res => {
        if (res != 'well') {
            console.log(res);
        }
    });
}
$('body')[0].addEventListener('onload', () => {
    $.get(`/getdata`).then(d => {
        if (d.theme == 'dark') $(':root').addClass('dark');
        $(':root').css('--theme-1', d.color1);
        $(':root').css('--theme-2', d.color2);
    })
});


/* PWA

navigator.serviceWorker.register('sw.js', { updateViaCache: 'none', scope: './' });
navigator.serviceWorker.controller.postMessage({
    head: 'is_update'
});
navigator.serviceWorker.controller.postMessage({
    head: 'get_userdata'
});
navigator.serviceWorker.addEventListener('message', function (e) {
    if (e.data.head == 'update') {
        updated = true;
        $('.msg.update>.main>.tit').html('<i class="bi bi-stars" style="background-image: linear-gradient(100deg, var(--theme-1), var(--theme-2));-webkit-background-clip: text;-webkit-text-fill-color: transparent;text-shadow:3px 3px 5px var(--sd);filter:saturate(200%) brightness(0.9);"></i> ' + $('#win-about>.cnt.update>div>details:first-child>summary').text());
        $('.msg.update>.main>.cont').html($('#win-about>.cnt.update>div>details:first-child>p').html());
        $('#loadbackupdate').css('display', 'block');
    } else if (e.data.head == 'userdata') {
        const d = e.data.data;
        console.log(d);
        if (d.theme == 'dark') $(':root').addClass('dark');
        $(':root').css('--theme-1', d.color1);
        $(':root').css('--theme-2', d.color2);
    }
});
function setData(k, v) {
    navigator.serviceWorker.controller.postMessage({
        head: 'set_userdata',
        key: k,
        value: v
    });
}
*/