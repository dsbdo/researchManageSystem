"use strict";
(function () {
    let nav_item_array = document.getElementsByClassName("nav-item");



    //添加信息
    let add_institute_id = document.getElementById("add_institute_id");
    let add_work_place_id = document.getElementById("add_work_place_id");
    let add_secretary_id = document.getElementById("add_secretary_id");
    let add_research_peole_id = document.getElementById("add_research_peole_id");
 
    let add_achievement_id = document.getElementById("add_achievement_id");
    let share_page_content = document.getElementById("page_content_id");
    let add_institute_director_id = document.getElementById("add_institute_director_id");

    let share_post_data = {};
    //添加研究机构
    add_institute_id.addEventListener("click", function () {
        for (let i = 0; i < nav_item_array.length; i++) {
            nav_item_array[i].setAttribute("class", "nav-item");
        }
        add_institute_id.setAttribute("class", "active nav-item");
        //添加机构列表页
        let post_data = {};

        function updatePage(inner_content) {
            let old_page = inner_content;
            document.getElementById("page_content_id").innerHTML = inner_content;
            document.getElementById("add_institute_btn_id").addEventListener("click", function () {
                let institute_name = document.getElementById("institute_name_id").value;
                let institute_research_direction = document.getElementById("institute_research_direction_id").value;
                let institute_secretary = document.getElementById("institute_secretary_id").value;
                let post_data = {
                    "institute_name": institute_name,
                    "info": institute_research_direction,
                    "secretary_id": institute_secretary
                }
                function updatePageSecond() {
                    document.getElementById("page_content_id").innerHTML = old_page;

                }
                ajax("/adminAddUser/addInstitute", "POST", post_data, updatePageSecond);
            });
        }
        ajax("/requirePage/addInstitute", "GET", post_data, updatePage);
    });

    //添加办公场地
    add_work_place_id.addEventListener("click", function () {
        //左边导航栏选中显示
        activeNavItem();
        add_work_place_id.setAttribute("class", "active nav-item");
        //添加工作地点
        share_post_data = {};
        function updatePage(inner_content) {
            let old_page = inner_content;
            document.getElementById("page_content_id").innerHTML = inner_content;
            function core(addEvent) {
                share_page_content.innerHTML = inner_content;
                addEvent();
            }
            function core_second() {
                document.getElementById("add_work_place_btn_id").addEventListener("click", function () {
                    share_post_data = {
                        "area": document.getElementById("work_place_area_id").value,
                        "place_address": document.getElementById("work_place_address_id").value,
                        "graduate_institute_id": document.getElementById("work_place_institute_id").value
                    }
                    function updatePageSecond(message) {
                        share_page_content.innerHTML = old_page;
                    }
                    ajax("/adminAddUser/addWorkPlace", "POST", share_post_data, updatePageSecond);
                });
            }
            core(core_second);

        }
        ajax("/requirePage/addWorkPlace", "GET", share_post_data, updatePage);
    });

    //添加秘书
    add_secretary_id.addEventListener("click", function () {
        activeNavItem();
        add_secretary_id.setAttribute('class', 'active nav-item');
        share_post_data = {};
        function updatePage(inner_content) {
            let old_page = inner_content;
            //share_page_content.innerHTML = inner_content;
            document.getElementById("page_content_id").innerHTML = inner_content;
            //点击添加一个秘书
            document.getElementById("add_secretary_btn_id").addEventListener("click", function () {
                let radios = document.getElementsByName("optionsRadios");
                let gender;
                for (let i = 0; i < radios.length; i++) {
                    if (radios[i].checked) {
                        gender = radios[i].value;
                        break;
                    }
                }
                //console.log(document.getElementById("secretary_name_id").value);
                share_post_data = {
                    "secretary_name": document.getElementById("secretary_name_id").value,
                    "gender": gender,
                    "age": document.getElementById("secretary_age_id").value,
                    "employee_time": document.getElementById("secretary_employee_time_id").value,
                    "employee_responsibility": document.getElementById("secretary_employee_responsibility_id").value
                }
                function updatePageSecond() {
                    share_page_content.innerHTML = old_page;
                }
                ajax("/adminAddUser/addSecretary", "POST", share_post_data, updatePageSecond);
            })
        }
        ajax("/requirePage/addSecretary", "GET", share_page_content, updatePage);
    });

    //添加科研人员
    add_research_peole_id.addEventListener("click", function () {
        activeNavItem();
        add_research_peole_id.setAttribute('class', 'active nav-item');
        share_post_data = {};


        function updatePage(inner_content) {
            let old_page = inner_content;
            //share_page_content.innerHTML = inner_content;
            document.getElementById("page_content_id").innerHTML = inner_content;
            //点击添加一个秘书
            document.getElementById("add_research_people_btn_id").addEventListener("click", function () {
                let radios = document.getElementsByName("optionsRadios");
                let gender;
                for (let i = 0; i < radios.length; i++) {
                    if (radios[i].checked) {
                        gender = radios[i].value;
                        break;
                    }
                }
                //console.log(document.getElementById("secretary_name_id").value);
                share_post_data = {
                    "research_people_name": document.getElementById("research_people_name_id").value,
                    "gender": gender,
                    "age": document.getElementById("research_people_age_id").value,
                    "job_title": document.getElementById("research_people_title_id").value,
                    "research_direction": document.getElementById("research_people_direction_id").value,
                    "graduate_institute_id": document.getElementById("research_people_institute_id").value
                }
                function updatePageSecond() {
                    share_page_content.innerHTML = old_page;
                }
                ajax("/adminAddUser/addResearchPeople", "POST", share_post_data, updatePageSecond);
            })
        }
        ajax("/requirePage/addResearchPeople", "GET", share_page_content, updatePage);

    });

    //添加科研成果
    add_achievement_id.addEventListener("click", function(){
        activeNavItem();
        add_achievement_id.setAttribute('class', 'active nav-item');
        let post_data = {};
        ajax("/requirePage/addAchievement", "GET", post_data, updatePageAchievement);
    });


    //添加研究室主任
    add_institute_director_id.addEventListener("click", function(){
        activeNavItem();
        add_institute_director_id.setAttribute('class', 'active nav-item');
        let post_data = {};

        ajax("/requirePage/addInstituteDirector", "GET", post_data, updatePageDirector);
    });




    function updatePageAchievement(inner_content)  {
        let old_page = inner_content;
        //share_page_content.innerHTML = inner_content;
        document.getElementById("page_content_id").innerHTML = inner_content;
        addContributor();
        addAchievement();
   

    }
    function addAchievement(){
        document.getElementById("add_achievement_btn_id").addEventListener("click", function(){
            let contributor = [];
            let $contributor = $("#achievement_contributor_list .contributor-list");
            for(let i = 0; i < $contributor.length; i++) {
                contributor.push($contributor[i].value);
            }
        
            console.log(contributor);
            let post_data = {
                "achievement_name": document.getElementById("achievement_name_id").value,
                "get_time":document.getElementById("achievement_get_time_id").value,
                "rank":document.getElementById("achievement_rank_id").value,
                "project_id": document.getElementById("achievement_project_id").value,
                "type": document.getElementById("achievement_type_id").value,
                "info": document.getElementById("achievement_info_id_2").value,
                "patent_type": document.getElementById("achievement_patent_type_id").value,
                "contributor_array": contributor
            }
            function updatePageSecond() {
                return ;
            }
            ajax("/adminAddTx/addAchievement", "POST", post_data, updatePageSecond);
        })
    }
    function addContributor(){
        document.getElementById("add_contributor_id").addEventListener("click", function(){
            let achievement_contributor_list = document.getElementById("achievement_contributor_list");
            let input_group = document.createElement("div");
            input_group.setAttribute("class", "input-group");
            input_group.innerHTML= '<span class="input-group-addon" id="basic-addon1">贡献者编号</span>'+
            '<input type="number" class="form-control  contributor-list" placeholder="Username" aria-describedby="basic-addon1">';
            achievement_contributor_list.appendChild(input_group);
        });
    }


    function updatePageDirector(inner_content){
        let old_page = inner_content;
        //share_page_content.innerHTML = inner_content;
        document.getElementById("page_content_id").innerHTML = inner_content;
        addInstituteDirector();
    }
    function addInstituteDirector() {
        document.getElementById("add_institute_director_btn_id").addEventListener("click", function(){
            let post_data = {
                "institute_id": document.getElementById("director_institute_id").value,
                "research_people_id": document.getElementById("director_research_people_id").value,
                "office_time": document.getElementById("director_office_date").value,
                "office_term": document.getElementById("director_office_term").value
            }
            function updatePageSecond() { return ;}
            ajax("/adminAddTx/addInstituteDirector","POST", post_data,updatePageSecond)
        });
    }




    function activeNavItem() {
        for (let i = 0; i < nav_item_array.length; i++) {
            nav_item_array[i].setAttribute("class", "nav-item");
        }
    }


    function ajax(url, method, post_data, updatePage) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status == 0) {
                    let responseText = xhr.responseText;
                    //这里便是响应报文
                    //console.log("ajax success");
                    alert(responseText);
                    //return responseText;
                    updatePage(responseText);
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