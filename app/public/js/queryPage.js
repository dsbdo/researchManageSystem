"use strict";
(function () {
    let nav_item_array = document.getElementsByClassName("nav-item");
    //查看相关信息的
    let institute_info_id = document.getElementById("institute_info_id");
    let work_place_info_id = document.getElementById("work_place_info_id");
    let secretary_info_id = document.getElementById("secretary_info_id");
    let institute_director_info_id = document.getElementById("institute_director_info_id");
    let research_people_info_id = document.getElementById("research_people_info_id");
    let project_info_id = document.getElementById("project_info_id");
    let achievement_info_id = document.getElementById("achievement_info_id");
    //添加相关事件监听
    institute_info_id.addEventListener("click", function () {
        activeNavItem();
        institute_info_id.setAttribute("class", "nav-item active");
        //发起http请求
        let post_data = {};
        ajax("/requirePage/getInstitute", "GET", post_data, updatePage, 'institute');
    });
    work_place_info_id.addEventListener("click", function () {
        activeNavItem();
        work_place_info_id.setAttribute("class", "nav-item active");
        let post_data = {};
        ajax("/requirePage/getWorkPlace", "GET", post_data, updatePage, 'work_place');
    });
    secretary_info_id.addEventListener("click", function () {
        activeNavItem();
        secretary_info_id.setAttribute("class", "nav-item active");
        let post_data = {};
        ajax("/requirePage/getSecretay", "GET", post_data, updatePage, 'secretary');
    });
    institute_director_info_id.addEventListener("click", function () {
        activeNavItem();
        institute_director_info_id.setAttribute("class", "nav-item active");
        let post_data = {};
        ajax("/requirePage/getInstituteDirector", "GET", post_data, updatePage, 'institute_director');
    });
    research_people_info_id.addEventListener("click", function () {
        activeNavItem();
        research_people_info_id.setAttribute("class", "nav-item active");
        let post_data = {};
        ajax("/requirePage/getResearchPeople", "GET", post_data, updatePage, 'research_people');
    });


    project_info_id.addEventListener("click", function () {
        activeNavItem();
        project_info_id.setAttribute("class", "nav-item active");
        let post_data = {};
        ajax("/requirePage/getProject", "GET", post_data, updatePage, 'project');
    });

    achievement_info_id.addEventListener("click", function () {
        activeNavItem();
        achievement_info_id.setAttribute("class", "nav-item active");
        let post_data = {};
        ajax("/requirePage/getAchievement", "GET", post_data, updatePage, 'achievement');
    });

    function updatePage(table, type) {
        //         <div class="panel panel-default">
        //   <!-- Default panel contents -->
        //   <div class="panel-heading">Panel heading</div>

        //   <!-- Table -->
        //   <table class="table">
        //     ...
        //   </table>
        // </div>
        let old_page = table;
        table = JSON.parse(table);
        let page_content = document.getElementById("page_content_id");
        let table_wrap = document.createElement("div");
        table_wrap.setAttribute("class", "table-responsive panel panel-default ");
        let panel = document.createElement("div");
        panel.setAttribute("class", "panel-heading");
        panel.setAttribute("id", "panel_id");
        panel.innerText = type;
        table_wrap.appendChild(panel);
        let table_tag = document.createElement("table");
        table_tag.setAttribute("class", "table table-striped");
        let thead_tag = document.createElement("thead");
        let tr_tag = document.createElement("tr");
        for (let key in table[0]) {
            let th_tag = document.createElement("th");
            th_tag.innerText = key;
            tr_tag.appendChild(th_tag);
        }

        let th_tag = document.createElement("th");
        th_tag.innerText = "查看详情";
        tr_tag.appendChild(th_tag);
        thead_tag.appendChild(tr_tag);

        let tbody_tag = document.createElement("tbody");
        table_tag.appendChild(tbody_tag);
        //对表进行处理， 是一个对象数组， 往tbody中插入数据即可，每一行为一个tr

        for (let i = 0; i < table.length; i++) {
            console.log(table[i]);
            let data_tr_tag = document.createElement("tr");
            for (let key in table[i]) {

                let data_td_tag = document.createElement("td");
                data_td_tag.innerText = table[i][key];
                data_tr_tag.appendChild(data_td_tag);
            }

            let data_td_tag = document.createElement("td");
            data_td_tag.innerHTML = '<button type="button" class="btn btn-success look-more" id="add_institute_director_btn_id">Look More</button>';
            data_tr_tag.appendChild(data_td_tag);
            tbody_tag.appendChild(data_tr_tag);
        }
        table_tag.appendChild(thead_tag);
        table_wrap.appendChild(table_tag);
        //document.getElementById("page_content_id").innerHTML = table;
        page_content.innerHTML = "";
        page_content.appendChild(table_wrap);
        console.log(table);
    }
    function addEventForBtns() {
        let look_btns = document.getElementsByClassName("look-more");
        for (let i = 0; i < look_btns.length; i++) {
            look_btns[i].addEventListener("click", function () {
                //第一读出是什么表， 第二读出查询的关键值
                let table_name = document.getElementById("panel_id").innerText;
                switch (table_name) {
                    case "institute":

                        break;
                    case "work_place":
                        break;
                    case "secretary":
                        break;
                    case "institute_director":
                        break;
                    case "research_people":
                    //查询跟一个科研人员有关的所有信息
                        break;
                    case "project":
                        break;
                    case "achievement":
                        break;
                    default:
                }

            });
        }
    }





    function activeNavItem() {
        for (let i = 0; i < nav_item_array.length; i++) {
            nav_item_array[i].setAttribute("class", "nav-item");
        }
    }


    function ajax(url, method, post_data, updatePage, type) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status == 0) {
                    let responseText = xhr.responseText;
                    //这里便是响应报文
                    //console.log("ajax success");
                    alert(responseText);
                    //return responseText;
                    updatePage(responseText, type);
                }
            }
        }
        // let postData = {
        //   work_id: document.getElementById("workID").value,
        //   admin_name: document.getElementById("adminName").value,
        //   passwd: hex_sha256(document.getElementById("passwd").value)
        // }
        xhr.open(method, url);
        // xhr.setRequestHeader("authorization", "Bearer " + document.getElementById("userId").value);
        if (JSON.stringify(post_data) === '{}') {
            xhr.send();
        } else {
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(post_data));
        }

    }

})()